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
AFD_PROFILE="${AZURE_AFD_PROFILE:-food-agentic-mass-cdn-profile}"
AFD_ENDPOINT="${AZURE_AFD_ENDPOINT:-food-agentic-mass}"         # prefix for *.z01.azurefd.net
AFD_ORIGIN_GROUP="${AZURE_AFD_ORIGIN_GROUP:-fam-storage-og}"
AFD_ORIGIN="${AZURE_AFD_ORIGIN:-fam-storage-origin}"
AFD_ROUTE="${AZURE_AFD_ROUTE:-default-route}"
APP_PLAN="${AZURE_APP_PLAN:-food-agentic-mass-plan}"
APP_NAME="${AZURE_APP_NAME:-food-agentic-mass-api}"             # must be globally unique
DB_SERVER="${AZURE_DB_SERVER:-food-agentic-mass-db}"            # must be globally unique
DB_NAME="${AZURE_DB_NAME:-food_agentic_mass_db}"
DB_ADMIN="${AZURE_DB_ADMIN:-famadmin}"
DB_PASS="${AZURE_DB_PASS:?Set AZURE_DB_PASS env var to a strong password}"
NODE_VERSION="${NODE_VERSION:-NODE:22-lts}"

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

# ---------------------------- Azure Front Door (Standard) --------------------
# Classic Azure CDN (Standard_Microsoft) no longer accepts new profiles
# (BadRequest as of 2025). Front Door Standard is the modern replacement —
# same CDN+edge+TLS purpose, *.z01.azurefd.net hostnames, az afd CLI.
say "Front Door profile: $AFD_PROFILE (Standard_AzureFrontDoor)"
if az afd profile show --profile-name "$AFD_PROFILE" --resource-group "$RG" >/dev/null 2>&1; then
  say "  ↳ already exists, skipping create"
else
  az afd profile create \
    --profile-name "$AFD_PROFILE" --resource-group "$RG" \
    --sku Standard_AzureFrontDoor >/dev/null
fi

say "Front Door endpoint: $AFD_ENDPOINT"
if az afd endpoint show --endpoint-name "$AFD_ENDPOINT" --profile-name "$AFD_PROFILE" --resource-group "$RG" >/dev/null 2>&1; then
  say "  ↳ already exists, skipping create"
else
  az afd endpoint create \
    --endpoint-name "$AFD_ENDPOINT" --profile-name "$AFD_PROFILE" --resource-group "$RG" \
    --enabled-state Enabled >/dev/null
fi

say "Origin group: $AFD_ORIGIN_GROUP (probe '/', interval 60s)"
if az afd origin-group show --origin-group-name "$AFD_ORIGIN_GROUP" --profile-name "$AFD_PROFILE" --resource-group "$RG" >/dev/null 2>&1; then
  say "  ↳ already exists, skipping create"
else
  az afd origin-group create \
    --origin-group-name "$AFD_ORIGIN_GROUP" --profile-name "$AFD_PROFILE" --resource-group "$RG" \
    --probe-path '/' --probe-protocol Https --probe-request-type GET \
    --probe-interval-in-seconds 60 \
    --sample-size 4 --successful-samples-required 3 \
    --additional-latency-in-milliseconds 50 >/dev/null
fi

say "Origin: $AFD_ORIGIN → $PRIMARY_WEB_HOST"
if az afd origin show --origin-name "$AFD_ORIGIN" --origin-group-name "$AFD_ORIGIN_GROUP" --profile-name "$AFD_PROFILE" --resource-group "$RG" >/dev/null 2>&1; then
  say "  ↳ already exists, skipping create"
else
  az afd origin create \
    --origin-name "$AFD_ORIGIN" --origin-group-name "$AFD_ORIGIN_GROUP" \
    --profile-name "$AFD_PROFILE" --resource-group "$RG" \
    --host-name "$PRIMARY_WEB_HOST" --origin-host-header "$PRIMARY_WEB_HOST" \
    --https-port 443 --priority 1 --weight 1000 --enabled-state Enabled >/dev/null
fi

say "Route: $AFD_ROUTE (/* → origin group, HTTPS redirect on)"
if az afd route show --route-name "$AFD_ROUTE" --endpoint-name "$AFD_ENDPOINT" --profile-name "$AFD_PROFILE" --resource-group "$RG" >/dev/null 2>&1; then
  say "  ↳ already exists, skipping create"
else
  az afd route create \
    --route-name "$AFD_ROUTE" --endpoint-name "$AFD_ENDPOINT" \
    --profile-name "$AFD_PROFILE" --resource-group "$RG" \
    --origin-group "$AFD_ORIGIN_GROUP" \
    --supported-protocols Http Https \
    --link-to-default-domain Enabled \
    --forwarding-protocol HttpsOnly \
    --https-redirect Enabled \
    --patterns-to-match '/*' >/dev/null
fi

# Resolve the actual Front Door hostname (includes a deployment-unique hash)
AFD_HOST="$(az afd endpoint show \
  --endpoint-name "$AFD_ENDPOINT" --profile-name "$AFD_PROFILE" --resource-group "$RG" \
  --query hostName -o tsv 2>/dev/null || true)"
if [ -z "${AFD_HOST:-}" ]; then
  AFD_HOST="<resolve-via-portal>"
fi
say "Front Door hostname: https://$AFD_HOST"

cat <<NOTE

Front Door Standard provisioned.
Frontends will be reachable at https://$AFD_HOST/offerings/<id>/
(blob \$web origin handles /offerings/<id>/ → /offerings/<id>/index.html
because index-document = index.html on the static website).

Optional Portal tweaks:
  · Caching: set 'Use query string' to 'Ignore' and 'Compression' to 'Enabled'
    on the default route (Front Door → Rules → default-route → Edit).
  · Custom domain: Front Door → Domains → +Add, then point CNAME at
    $AFD_HOST and let Front Door issue a managed cert.

See infrastructure/azure-cdn-rules.md for the full rules and CLI commands.

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
    AZURE_CDN_ENDPOINT="https://${AFD_HOST}" \
    AZURE_STORAGE_ACCOUNT="$STORAGE" \
    AZURE_RESOURCE_GROUP="$RG" \
    AZURE_AFD_PROFILE="$AFD_PROFILE" \
    AZURE_AFD_ENDPOINT="$AFD_ENDPOINT" \
    AZURE_AFD_HOST="$AFD_HOST" \
    CORS_ORIGIN="https://${AFD_HOST}" \
  >/dev/null

# ---------------------------- Outputs ----------------------------------------
cat <<DONE

╭──────────────────────────────────────────────────────────────────────╮
│ Food Agentic Mass — Azure resources provisioned                      │
╰──────────────────────────────────────────────────────────────────────╯

  Resource group         : $RG ($LOCATION)
  Storage (static web)   : https://$PRIMARY_WEB_HOST
  Front Door endpoint    : https://$AFD_HOST
  PostgreSQL host        : $DB_HOST
  Database               : $DB_NAME
  API (App Service)      : https://${APP_NAME}.azurewebsites.net

Next steps:
  1. Set GitHub Secrets for CI (.github/workflows/deploy.yml):
       AZURE_CREDENTIALS              → az ad sp create-for-rbac --sdk-auth --scopes /subscriptions/<sub>/resourceGroups/$RG
       AZURE_STORAGE_CONN_STR         → az storage account show-connection-string -n $STORAGE -g $RG -o tsv
       AZURE_WEBAPP_PUBLISH_PROFILE   → az webapp deployment list-publishing-profiles -n $APP_NAME -g $RG --xml
       AZURE_AFD_PROFILE              → $AFD_PROFILE   (repo variable, not secret)
       AZURE_AFD_ENDPOINT             → $AFD_ENDPOINT  (repo variable, not secret)
       JWT_SECRET                     → long random string
  2. Run the SQL migrations from CI (or locally with DATABASE_HOST=$DB_HOST).
  3. Push to main; the deploy workflow uploads all 252 offering pages and the API.

Public URL for a frontend (after deploy):  https://$AFD_HOST/offerings/a01/
DONE
