# Food Agentic Mass — 252 AI Automation Offerings

**Source document:** `252_Offerings_NestJS_Azure_CDN_Guide.docx` (May 2026, DestinPQ LLP, Draft v1.0)

## 1. Goal

Deliver **252 AI / automation offerings** for a restaurant chain on a single, manifest-driven platform:

1. All business logic lives in **one NestJS API** (modular, one folder per offering).
2. Each of the 252 offerings ships as a **separate static frontend page** served from **Azure Blob Storage + Azure CDN** at its own URL path (`https://food-agentic-mass.azureedge.net/offerings/<id>/`).
3. The two layers communicate only through the REST API, protected by **JWT + RBAC**.
4. Every offering follows the **same 10-step build pattern** so it can be code-generated.

## 2. Scope

14 categories × 18 offerings = **252**.

| Code | Category | Theme |
|------|----------|-------|
| A | Owner Centre | Dashboards, MIS, alerts, forecasting |
| B | POS & Billing | Order entry, payments, tokens, reconciliation |
| C | Customer CRM | Phone-based memory, loyalty, segmentation |
| D | WhatsApp Marketing | Outbound, campaigns, chatbots |
| E | Kitchen | KDS, batches, wastage, availability |
| F | Inventory | Stock, consumption, expiry, forecasting |
| G | Vendor | Master, POs, GRN, payments, scorecards |
| H | Quality | Ratings, complaints, sentiment, hygiene |
| I | Staff | Profiles, attendance, payroll, productivity |
| J | Accounts | Cash, UPI, P&L, GST, Tally |
| K | Delivery | Orders, agents, ETA, zones, SLAs |
| L | CCTV | Footfall, security, privacy |
| M | AI Support | Forecasts, NLP, sentiment, copilot |
| N | Multi-Branch | Central menu, inventory, P&L, franchise |

Each offering is tagged with delivery **Phase 1–4** (1 = MVP).

## 3. Architecture

| Layer | Technology | Responsibility |
|-------|-----------|----------------|
| Backend API | NestJS (Node 20) | Business logic, auth, queues |
| Database | PostgreSQL 15 + TypeORM | Transactional data |
| Frontend (per offering) | Static HTML/JS (Vite + React template) | One static site per offering |
| Hosting | Azure Blob Storage `$web` + Azure CDN | Per-path routing to 252 sites |
| WhatsApp | Meta Cloud API | Messaging, chatbots, broadcasts |
| AI | Azure OpenAI | Forecasts, NLP, anomaly detection |
| Auth | JWT + Passport.js | RBAC (OWNER, MANAGER, CASHIER, KITCHEN, INVENTORY, VENDOR, ADMIN) |
| CI/CD | GitHub Actions | Backend → App Service, frontends → Blob, CDN purge |

## 4. Repository Layout

```
food-agentic-mass/
├── PLAN.md                          # this file
├── README.md                        # how to run / deploy
├── .gitignore
├── .env.example
├── .github/workflows/
│   ├── ci.yml                       # lint + build on every PR
│   └── deploy.yml                   # deploy backend + 252 frontends on push to main
├── infrastructure/
│   ├── azure-setup.sh               # one-time Azure resource provisioning
│   └── azure-cdn-rules.md           # CDN routing rules reference
├── scripts/
│   ├── offerings-manifest.json      # SINGLE SOURCE OF TRUTH — 252 offerings
│   ├── parse-offerings.py           # rebuild manifest from the .docx
│   ├── generate-backend.py          # materialise all 252 NestJS modules
│   ├── generate-frontend.py         # materialise all 252 static pages
│   └── deploy-frontends.sh          # batch deploy all 252 frontends to Azure
├── backend/                         # NestJS API
│   ├── package.json
│   ├── tsconfig.json
│   ├── nest-cli.json
│   └── src/
│       ├── main.ts                  # Swagger, helmet, validation
│       ├── app.module.ts            # registers all 252 modules
│       ├── common/                  # guards, decorators, filters, interceptors, dto
│       ├── config/                  # env loaders
│       ├── database/                # TypeORM data-source + migrations
│       ├── auth/                    # JWT login + RBAC
│       └── modules/
│           ├── a-owner/             # Category A: 18 modules
│           │   ├── a01-daily-sales-dashboard/
│           │   │   ├── a01.module.ts
│           │   │   ├── a01.controller.ts
│           │   │   ├── a01.service.ts
│           │   │   ├── a01.entity.ts
│           │   │   └── dto/{create,update}-a01.dto.ts
│           │   └── …
│           ├── b-pos/               # Category B: 18 modules
│           ├── …                    # C…M
│           ├── n-multi-branch/      # Category N: 18 modules
│           └── registry.ts          # exports every module for app.module.ts
└── frontend/
    ├── template/                    # Vite + React reference template
    │   ├── package.json
    │   ├── vite.config.ts
    │   └── src/{api,hooks,components}
    └── offerings/
        ├── a01/index.html           # per-offering static page
        ├── a02/index.html
        └── …                        # all 252
```

## 5. Per-Offering Standard (10-step pattern)

For every offering the generator produces:

1. NestJS module under `backend/src/modules/<cat>/<id>-<slug>/`
2. `<id>.entity.ts` — `@Entity('<id>_records')`, UUID PK, offering-specific columns
3. `dto/{create,update}-<id>.dto.ts` — class-validator decorators
4. `<id>.service.ts` — repository-backed CRUD + business stubs
5. `<id>.controller.ts` — `@UseGuards(JwtAuthGuard, RolesGuard)`, `@ApiTags('<id>')`, the API endpoints listed in the docx
6. Auto-registered in `app.module.ts` via `registry.ts`
7. Migration generated + run (initial migration shipped, per-offering migrations added at delivery time)
8. Static frontend page in `frontend/offerings/<id>/index.html` with the features listed in the docx
9. Deploy: `az storage blob upload-batch -s dist/ -d '$web/offerings/<id>/'`
10. Purge CDN: `az cdn endpoint purge --content-paths '/offerings/<id>/*'`

## 6. Execution Strategy — Manifest-Driven

Hand-writing 252 modules is impractical, so:

1. **`scripts/offerings-manifest.json`** is built once by parsing the source `.docx` and is the single source of truth (id, category, name, slug, description, phase, controller path, endpoints, frontend features, CDN URL) for all 252 entries.
2. **`scripts/generate-backend.py`** reads the manifest and emits 5 NestJS files per offering plus `registry.ts`.
3. **`scripts/generate-frontend.py`** reads the manifest and emits a static `index.html` per offering using a shared template.
4. CI (`.github/workflows/deploy.yml`) builds the backend, then loops the manifest to build & upload each of the 252 frontends to Azure with a job-matrix.

Adding offering #253 = one new entry in the manifest + `npm run generate`.

## 7. Phasing

- **Phase 1 (MVP — ~90 offerings):** core POS, kitchen, inventory, owner dashboards, basic CRM and WhatsApp.
- **Phase 2:** richer analytics, vendor workflows, staff & accounts, delivery basics.
- **Phase 3:** forecasting / AI summaries, multi-branch consolidation, advanced CRM.
- **Phase 4:** computer-vision (CCTV), advanced AI copilot, franchise, route optimisation, third-party integrations.

The generator marks each module with its phase tag so CI can ship only Phase 1 first.

## 8. Security & Compliance

- JWT secrets, Azure credentials, WhatsApp tokens, and DB passwords live only in `.env` (local) or **GitHub Secrets** (CI). `.env.example` is the public contract.
- Roles: `OWNER, MANAGER, CASHIER, KITCHEN, INVENTORY, VENDOR, ADMIN`.
- CDN must serve `/api/*` with `Cache-Control: no-cache`.
- Customer face/selfie features (C15) require recorded consent (C14) and pass the privacy compliance checker (L18).

## 9. Out of Scope (initial scaffold)

- Actual business logic inside each service (the generator emits a thin CRUD skeleton wired to TypeORM; offering-specific algorithms are added per ticket).
- Real Azure provisioning (the script is provided but must be run by a human with credentials).
- WhatsApp Business API onboarding (requires Meta-side setup).

## 10. Definition of Done (for this scaffold)

- [x] Repository initialised, ready to push to `DestinPQ-LLP/food-agentic-mass`.
- [x] Manifest with 252 offerings, parsed from the docx, committed.
- [x] All 252 backend modules generated, consistent, and registered in `app.module.ts`.
- [x] All 252 frontend pages generated, each hitting the documented endpoints.
- [x] `npm install && npm run build` succeeds inside `backend/`.
- [x] `infrastructure/azure-setup.sh` documents the Azure resources to create.
- [x] `.github/workflows/deploy.yml` builds backend + matrix-deploys frontends.
- [x] `PLAN.md`, `README.md`, and `offerings-manifest.json` together fully describe the system.
