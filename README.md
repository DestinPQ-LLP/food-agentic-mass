# Food Agentic Mass — 252 AI Automation Offerings

Complete platform delivering **252 AI / automation offerings** across 14 categories.

- **Backend:** a single NestJS app, one module per offering, PostgreSQL via TypeORM, JWT + RBAC.
- **Frontend:** 252 static pages, one per offering, hosted on **Azure Blob Storage + Azure CDN** at `https://food-agentic-mass.azureedge.net/offerings/<id>/`.
- **Manifest-driven:** `scripts/offerings-manifest.json` is the single source of truth; backend and frontend skeletons are regenerated from it.

For the full design, see [`PLAN.md`](./PLAN.md).

---

## Repository Layout

```
food-agentic-mass/
├── PLAN.md                          # Project plan (read first)
├── README.md                        # This file
├── .env.example                     # Public contract for backend env vars
├── .github/workflows/
│   ├── ci.yml                       # Lint + build on PRs
│   └── deploy.yml                   # Backend → App Service, frontends → Blob (matrix)
├── infrastructure/
│   ├── azure-setup.sh               # One-time Azure resource provisioning
│   └── azure-cdn-rules.md           # CDN rules engine reference
├── scripts/
│   ├── offerings-manifest.json      # 252 offerings — single source of truth
│   ├── parse-offerings.py           # Rebuild manifest from the source .docx
│   ├── generate-backend.py          # Materialise all 252 NestJS modules
│   ├── generate-frontend.py         # Materialise all 252 static pages
│   └── deploy-frontends.sh          # Batch upload all 252 frontends to Azure
├── backend/                         # NestJS API (see its own README)
└── frontend/                        # template/ + offerings/<id>/index.html
```

---

## Quick Start (local development)

### Prerequisites

- Node.js **22 LTS** + npm 10+
- PostgreSQL **15+** running locally
- (Optional) Azure CLI for deployments
- Python 3.10+ (only for re-running `parse-offerings.py` / generators)

### 1. Backend

```bash
cd backend
cp ../.env.example .env       # then edit values
npm install
npm run migration:run         # apply schema (once you add migrations)
npm run start:dev
```

The API will be live at `http://localhost:3000`, with Swagger docs at `http://localhost:3000/api/docs`.

### 2. Frontend (single offering, local preview)

```bash
cd frontend/offerings/a01
python3 -m http.server 8001
# open http://localhost:8001
```

### 3. Regenerate modules / pages

After editing `scripts/offerings-manifest.json` (e.g. adding offering #253):

```bash
# From the repo root
python3 scripts/generate-backend.py
python3 scripts/generate-frontend.py
```

To rebuild the manifest itself from the source `.docx` (requires `python-docx` or pre-extracted text):

```bash
python3 scripts/parse-offerings.py
```

---

## The 252 Offerings

14 categories × 18 offerings = **252**. Full IDs and CDN URLs in `scripts/offerings-manifest.json`.

| Code | Category | Examples |
|------|----------|----------|
| A | Owner Centre | Daily Sales, Peak Hours, P&L, Forecasting, Command Centre |
| B | POS & Billing | Quick Select, Token, Bill Print, GST, Split Payment |
| C | Customer CRM | Phone Capture, Loyalty, Segmentation, LTV, Consent |
| D | WhatsApp Marketing | MIS Bot, Campaigns, Feedback, PO via WA, Chatbot |
| E | Kitchen | KDS, Token Queue, Batches, Wastage, Recipe/BOM |
| F | Inventory | Material Master, Stock, GRN, Consumption, Forecaster |
| G | Vendor | Master, PO, GRN, Payments, Scorecards |
| H | Quality | Ratings, Reviews, Sentiment, Hygiene, Incidents |
| I | Staff | Profiles, Attendance, Tasks, Payroll, Productivity |
| J | Accounts | Cash, UPI, P&L, GST, Tally Export |
| K | Delivery | Orders, Agents, ETA, Zones, SLA |
| L | CCTV | Footfall, Security, Privacy, Analytics |
| M | AI Support | Forecasts, Sentiment, Copilot, Recommendations |
| N | Multi-Branch | Central Menu, Inventory, P&L, Franchise |

Each offering has a phase tag (1–4); Phase 1 forms the MVP.

---

## Deployment

### Backend → Azure App Service

```bash
cd backend
npm run build
# CI/CD does this automatically on push to main; see .github/workflows/deploy.yml
```

### 252 Frontends → Azure Blob Storage `$web`

```bash
# One-time
./infrastructure/azure-setup.sh

# Every release (CI does this in a matrix)
./scripts/deploy-frontends.sh
```

Each offering ends up at `https://food-agentic-mass.azureedge.net/offerings/<id>/`.

### Required GitHub Secrets

- `AZURE_CREDENTIALS` — JSON output of `az ad sp create-for-rbac --sdk-auth`
- `AZURE_STORAGE_CONN_STR` — connection string for the `foodagenticmasscdn` storage account
- `AZURE_WEBAPP_PUBLISH_PROFILE` — for the NestJS App Service
- `DATABASE_URL` — PostgreSQL connection string
- `JWT_SECRET` — long random string

---

## Security

- Secrets live only in `.env` (local) or GitHub Secrets (CI). `.env.example` is the public contract.
- Roles: `OWNER, MANAGER, CASHIER, KITCHEN, INVENTORY, VENDOR, ADMIN`.
- CDN serves `/api/*` with `Cache-Control: no-cache`.
- Customer face/selfie features (C15) require recorded consent (C14).

---

## License

Confidential. © 2026 DestinPQ LLP. All rights reserved.
