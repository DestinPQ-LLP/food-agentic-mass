#!/usr/bin/env bash
# Batch-upload all 252 offering frontends to Azure Blob Storage `$web` and
# purge the CDN. Reads scripts/offerings-manifest.json for the offering IDs.
#
# Requires: az CLI logged in, jq.
#
# Env vars:
#   AZURE_STORAGE_CONN_STR       (or AZURE_STORAGE_ACCOUNT + an active session)
#   AZURE_STORAGE_ACCOUNT        defaults to foodagenticmasscdn
#   AZURE_CDN_PROFILE_NAME       defaults to food-agentic-mass-cdn-profile
#   AZURE_CDN_ENDPOINT_NAME      defaults to food-agentic-mass
#   AZURE_RESOURCE_GROUP         defaults to food-agentic-mass-rg

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MANIFEST="$ROOT/scripts/offerings-manifest.json"
OFFERINGS_DIR="$ROOT/frontend/offerings"

ACCOUNT="${AZURE_STORAGE_ACCOUNT:-foodagenticmasscdn}"
PROFILE="${AZURE_CDN_PROFILE_NAME:-food-agentic-mass-cdn-profile}"
ENDPOINT="${AZURE_CDN_ENDPOINT_NAME:-food-agentic-mass}"
RG="${AZURE_RESOURCE_GROUP:-food-agentic-mass-rg}"

if ! command -v jq >/dev/null; then
  echo "jq is required (brew install jq)" >&2
  exit 1
fi

ids=$(jq -r '.offerings[].idLower' "$MANIFEST")
count=$(echo "$ids" | wc -l | tr -d ' ')
echo "Deploying $count offering pages to $ACCOUNT/\$web/offerings/ …"

upload_one() {
  local id="$1"
  az storage blob upload-batch \
    --account-name "$ACCOUNT" \
    --destination "\$web/offerings/$id" \
    --source "$OFFERINGS_DIR/$id" \
    --overwrite \
    --output none
  echo "  ↑ $id"
}

# Upload index.html (the 252-tile catalogue)
az storage blob upload \
  --account-name "$ACCOUNT" \
  --container-name '$web' \
  --name 'offerings/index.html' \
  --file "$OFFERINGS_DIR/index.html" \
  --overwrite --output none
echo "  ↑ offerings/index.html (catalogue)"

# Upload each offering folder
for id in $ids; do
  upload_one "$id"
done

echo "Purging CDN cache for /offerings/* …"
az cdn endpoint purge \
  --name "$ENDPOINT" --profile-name "$PROFILE" --resource-group "$RG" \
  --content-paths '/offerings/*' --no-wait

echo "Done. Catalogue: https://${ENDPOINT}.azureedge.net/offerings/"
