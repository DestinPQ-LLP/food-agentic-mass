#!/usr/bin/env bash
# One-time Azure resource provisioning for Food Agentic Mass.
#
# Creates:
#   - Resource group
#   - Storage account with $web static-website hosting (hosts 252 offering pages)
#   - Azure CDN profile + endpoint pointing at the $web origin
#   - Azure Database for PostgreSQL (Flexible Server)
#   - Azure App Service plan + Linux Node 20 Web App (hosts the NestJS API)
#
# Requires: az CLI ≥ 2.60. Run once after `az login`.

set -euo pipefail

# ---------------------------- Configuration ----------------------------------
LOCATION="${AZURE_LOCATION:-centralindia}"
RG="${AZURE_RESOURCE_GROUP:-food-agentic-mass-rg}"
STORAGE="${AZURE_STORAGE_ACCOUNT:-foodagenticmasscdn}"          # must be globally unique
CDN_PROFILE="${AZURE_CDN_PROFILE_NAME:-food-agentic-mass-cdn-profile}"
CDN_ENDPOINT="${AZURE_CDN_ENDPOINT_NAME:-food-agentic-mass}"    # must be globally unique
APP_PLAN="${AZURE_APP_PLAN:-food-agentic-mass-plan}"
APP_NAME="${AZURE_APP_NAME:-food-agentic-mass-api}"             # must be globally unique
DB_SERVER="${AZURE_DB_SERVER:-food-agentic-mass-db}"            # must be globally unique
DB_NAME="${AZURE_DB_NAME:-food_agentic_mass_db}"
DB_ADMIN="${AZURE_DB_ADMIN:-famadmin}"
DB_PASS="${AZURE_DB_PASS:?Set AZURE_DB_PASS env var to a strong password}"
NODE_VERSION="${NODE_VERSION:-NODE|20-lts}"

say() { printf '\033[1;36m▸ %s\033[0m\n' "$*"; }

# ---------------------------- Resource group ---------------------------------
say "Resource group: $RG ($LOCATION)"
az group create --name "$RG" --location "$LOCATION" >/dev/null

# ---------------------------- Storage + static web ---------------------------
say "Storage account: $STORAGE"
az storage account create \
  --name "$STORAGE" --resource-group "$RG" --location "$LOCATION" \
  --sku Standard_LRS --kind StorageV2 --allow-blob-public-access true >/dev/null

say "Enabling static website on $STORAGE (\$web)"
az storage blob service-properties update \
  --account-name "$STORAGE" --auth-mode login --static-website \
  --index-document index.html --404-document 404.html >/dev/null

PRIMARY_WEB_HOST="$(az storage account show \
  --name "$STORAGE" --resource-group "$RG" \
  --query 'primaryEndpoints.web' -o tsv | sed -E 's#https?://([^/]+)/?#\1#')"
say "Primary web endpoint: https://$PRIMARY_WEB_HOST"

# ---------------------------- CDN profile + endpoint -------------------------
# Classic Azure CDN (Standard_Microsoft) is being phased out in favour of
# Azure Front Door, but new Standard_Microsoft profiles can still be created
# on Sponsorship subscriptions through 2026. If this step ever fails with
# "SKU not supported", switch to Azure Front Door — see the comment below.
say "CDN profile: $CDN_PROFILE (Standard_Microsoft)"
if az cdn profile show --name "$CDN_PROFILE" --resource-group "$RG" >/dev/null 2>&1; then
  say "  ↳ already exists, skipping create"
else
  az cdn profile create \
    --name "$CDN_PROFILE" --resource-group "$RG" \
    --sku Standard_Microsoft >/dev/null
fi

say "CDN endpoint: $CDN_ENDPOINT.azureedge.net → $PRIMARY_WEB_HOST"
if az cdn endpoint show --name "$CDN_ENDPOINT" --profile-name "$CDN_PROFILE" --resource-group "$RG" >/dev/null 2>&1; then
  say "  ↳ already exists, skipping create"
else
  az cdn endpoint create \
    --name "$CDN_ENDPOINT" --profile-name "$CDN_PROFILE" --resource-group "$RG" \
    --origin "$PRIMARY_WEB_HOST" --origin-host-header "$PRIMARY_WEB_HOST" \
    --enable-compression true --no-http true \
    --content-types-to-compress \
      'application/javascript' 'application/json' 'text/css' 'text/html' 'image/svg+xml' \
    >/dev/null
fi

cat <<NOTE

CDN endpoint created. Recommended manual configuration in the Portal
(Azure CDN → $CDN_ENDPOINT → Rules engine):

  1. URL rewrite — incoming: /offerings/* → /offerings/{wildcard}/index.html
  2. HTTPS-only redirect (308) — global
  3. Cache-Control for /offerings/* = public, max-age=86400
  4. Cache-Control for /api/* = no-cache, must-revalidate
  5. Add CORS allow for the API host (Access-Control-Allow-Origin: https://$CDN_ENDPOINT.azureedge.net)

See infrastructure/azure-cdn-rules.md for the exact rules and JSON snippets.

NOTE

# ---------------------------- PostgreSQL Flexible Server ---------------------
say "PostgreSQL Flexible Server: $DB_SERVER"
if az postgres flexible-server show --name "$DB_SERVER" --resource-group "$RG" >/dev/null 2>&1; then
  say "  ↳ already exists, skipping create"
else
  az postgres flexible-server create \
    --name "$DB_SERVER" --resource-group "$RG" --location "$LOCATION" \
    --admin-user "$DB_ADMIN" --admin-password "$DB_PASS" \
    --tier Burstable --sku-name Standard_B1ms --storage-size 32 \
    --version 15 --public-access 0.0.0.0 --yes >/dev/null
fi

say "Creating database: $DB_NAME"
if az postgres flexible-server db show --resource-group "$RG" --server-name "$DB_SERVER" --database-name "$DB_NAME" >/dev/null 2>&1; then
  say "  ↳ already exists, skipping create"
else
  az postgres flexible-server db create \
    --resource-group "$RG" --server-name "$DB_SERVER" --database-name "$DB_NAME" >/dev/null
fi

# ---------------------------- App Service plan + Node 20 ---------------------
say "App Service plan: $APP_PLAN (Linux B1)"
if az appservice plan show --name "$APP_PLAN" --resource-group "$RG" >/dev/null 2>&1; then
  say "  ↳ already exists, skipping create"
else
  az appservice plan create \
    --name "$APP_PLAN" --resource-group "$RG" --location "$LOCATION" \
    --is-linux --sku B1 >/dev/null
fi

say "Web App: $APP_NAME"
if az webapp show --name "$APP_NAME" --resource-group "$RG" >/dev/null 2>&1; then
  say "  ↳ already exists, skipping create"
else
  az webapp create \
    --name "$APP_NAME" --plan "$APP_PLAN" --resource-group "$RG" \
    --runtime "$NODE_VERSION" >/dev/null
fi

DB_HOST="${DB_SERVER}.postgres.database.azure.com"
say "Configuring App Service settings (DB host: $DB_HOST)"
az webapp config appsettings set \
  --name "$APP_NAME" --resource-group "$RG" \
  --settings \
    NODE_ENV=production \
    PORT=8080 \
    DATABASE_HOST="$DB_HOST" \
    DATABASE_PORT=5432 \
    DATABASE_NAME="$DB_NAME" \
    DATABASE_USER="$DB_ADMIN" \
    DATABASE_PASS="$DB_PASS" \
    DATABASE_SSL=true \
    AZURE_CDN_ENDPOINT="https://${CDN_ENDPOINT}.azureedge.net" \
    AZURE_STORAGE_ACCOUNT="$STORAGE" \
    AZURE_RESOURCE_GROUP="$RG" \
    AZURE_CDN_PROFILE_NAME="$CDN_PROFILE" \
    AZURE_CDN_ENDPOINT_NAME="$CDN_ENDPOINT" \
    CORS_ORIGIN="https://${CDN_ENDPOINT}.azureedge.net" \
  >/dev/null

# ---------------------------- Outputs ----------------------------------------
cat <<DONE

╭──────────────────────────────────────────────────────────────────────╮
│ Food Agentic Mass — Azure resources provisioned                      │
╰──────────────────────────────────────────────────────────────────────╯

  Resource group         : $RG ($LOCATION)
  Storage (static web)   : https://$PRIMARY_WEB_HOST
  CDN endpoint           : https://${CDN_ENDPOINT}.azureedge.net
  PostgreSQL host        : $DB_HOST
  Database               : $DB_NAME
  API (App Service)      : https://${APP_NAME}.azurewebsites.net

Next steps:
  1. Set GitHub Secrets for CI (.github/workflows/deploy.yml):
       AZURE_CREDENTIALS              → az ad sp create-for-rbac --sdk-auth --scopes /subscriptions/<sub>/resourceGroups/$RG
       AZURE_STORAGE_CONN_STR         → az storage account show-connection-string -n $STORAGE -g $RG -o tsv
       AZURE_WEBAPP_PUBLISH_PROFILE   → az webapp deployment list-publishing-profiles -n $APP_NAME -g $RG --xml
       JWT_SECRET                     → long random string
  2. Run the SQL migrations from CI (or locally with DATABASE_HOST=$DB_HOST).
  3. Push to main; the deploy workflow uploads all 252 offering pages and the API.
DONE
