# Azure CDN — Routing & Caching Rules

The Azure CDN endpoint `food-agentic-mass.azureedge.net` fronts the storage
account's `$web` container, which holds **252 offering pages** under
`offerings/<id>/index.html`. The rules below ensure clean URLs, correct
cache headers, and that `/api/*` is never cached.

Configure these in the Azure Portal → CDN profile → endpoint → **Rules
engine**, or via `az cdn endpoint rule add` (commands shown at the end).

---

## Rule 1 — SPA-style URL rewrite for offerings

| Field | Value |
|-------|-------|
| Order | 1 |
| Condition | URL file extension is `''` (empty) **AND** URL path begins with `/offerings/` |
| Action | URL Rewrite → Source `/offerings/*` → Destination `/offerings/{wildcard}/index.html` |

Effect: `https://food-agentic-mass.azureedge.net/offerings/a01/` resolves
to `$web/offerings/a01/index.html` instead of returning a 404.

## Rule 2 — HTTPS-only redirect

| Field | Value |
|-------|-------|
| Order | 2 |
| Condition | Request protocol = `HTTP` |
| Action | URL Redirect → Type `Moved` (301) → Protocol `HTTPS` |

## Rule 3 — Long cache for offering pages

| Field | Value |
|-------|-------|
| Order | 3 |
| Condition | URL path begins with `/offerings/` |
| Action | Modify response header → `Cache-Control: public, max-age=86400` |

## Rule 4 — No cache for the API

| Field | Value |
|-------|-------|
| Order | 4 |
| Condition | URL path begins with `/api/` |
| Action | Modify response header → `Cache-Control: no-cache, must-revalidate` **AND** Bypass cache |

> The API path is normally served from a separate hostname (the App
> Service). This rule is a safety net in case `/api/*` ever lands on the
> CDN through a path-based router.

## Rule 5 — Long cache for static assets

| Field | Value |
|-------|-------|
| Order | 5 |
| Condition | URL file extension is `js`, `css`, `svg`, `png`, `jpg`, `webp`, `woff2` |
| Action | Modify response header → `Cache-Control: public, max-age=2592000, immutable` |

## Rule 6 — Compression

Enable on the endpoint itself (not the rules engine):

```
az cdn endpoint update \
  --name food-agentic-mass --profile-name food-agentic-mass-cdn-profile \
  --resource-group food-agentic-mass-rg \
  --enable-compression true
```

Content types to compress:

```
application/javascript
application/json
text/css
text/html
text/plain
image/svg+xml
```

---

## Purge after a deploy

```bash
az cdn endpoint purge \
  --name food-agentic-mass \
  --profile-name food-agentic-mass-cdn-profile \
  --resource-group food-agentic-mass-rg \
  --content-paths '/offerings/*' \
  --no-wait
```

Purge a single offering after a hotfix:

```bash
az cdn endpoint purge ... --content-paths '/offerings/a01/*' --no-wait
```

---

## CLI for Rule 1 (URL rewrite)

The portal UI is easiest, but for full automation:

```bash
az cdn endpoint rule add \
  --resource-group food-agentic-mass-rg \
  --profile-name food-agentic-mass-cdn-profile \
  --name food-agentic-mass \
  --rule-name "RewriteOfferings" --order 1 \
  --match-variable UrlFileExtension --operator Equal --match-values "" \
  --action-name UrlRewrite \
  --source-pattern "/offerings/" \
  --destination "/offerings/index.html" \
  --preserve-unmatched-path false
```

(For full path-rewrite with wildcards, use the portal; the CLI flag
`--destination` does not yet expand `{wildcard}` correctly.)

---

## Custom domain (optional)

1. In your DNS provider, add `CNAME offerings.example.com → food-agentic-mass.azureedge.net`.
2. In the portal, **CDN endpoint → Custom domains → +Custom domain** and follow the verification steps.
3. Enable Azure-managed certificate for HTTPS.
