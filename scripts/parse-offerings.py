#!/usr/bin/env python3
"""Parse the 252 Offerings docx into a structured manifest.

Reads `scripts/source-doc.txt` (a UTF-8 plain-text export of the docx) and
emits `scripts/offerings-manifest.json` — the single source of truth for
all 252 offerings, used by `generate-backend.py` and `generate-frontend.py`.

If `scripts/source-doc.txt` is missing, the script tries to regenerate it
via macOS `textutil` from `~/Downloads/252_Offerings_NestJS_Azure_CDN_Guide.docx`.

Output JSON shape (one entry per offering):
{
  "id":           "A01",
  "idLower":      "a01",
  "category":     "A",
  "categoryName": "Owner Centre",
  "categorySlug": "a-owner",
  "name":         "Daily Sales Dashboard",
  "slug":         "daily-sales-dashboard",
  "folder":       "a01-daily-sales-dashboard",
  "description":  "Real-time view of today's total revenue ...",
  "phase":        1,
  "controllerPath": "api/owner/daily-sales",
  "endpoints": [
    { "method": "GET", "path": "api/owner/daily-sales",        "relPath": "",         "description": "..." },
    { "method": "GET", "path": "api/owner/daily-sales/items",  "relPath": "items",    "description": "..." },
    ...
  ],
  "features":     ["Total revenue card", "Order count card", ...],
  "cdnUrl":       "https://food-agentic-mass.azureedge.net/offerings/a01/"
}
"""
from __future__ import annotations

import json
import os
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SOURCE_TXT = ROOT / "scripts" / "source-doc.txt"
SOURCE_DOCX_DEFAULT = Path.home() / "Downloads" / "252_Offerings_NestJS_Azure_CDN_Guide.docx"
OUTPUT_JSON = ROOT / "scripts" / "offerings-manifest.json"

CDN_HOST = "food-agentic-mass.azureedge.net"

CATEGORY_DEFS = {
    "A": ("Owner Centre",        "a-owner"),
    "B": ("POS & Billing",       "b-pos"),
    "C": ("Customer CRM",        "c-customer-crm"),
    "D": ("WhatsApp Marketing",  "d-whatsapp"),
    "E": ("Kitchen",             "e-kitchen"),
    "F": ("Inventory",           "f-inventory"),
    "G": ("Vendor",              "g-vendor"),
    "H": ("Quality",             "h-quality"),
    "I": ("Staff",               "i-staff"),
    "J": ("Accounts",            "j-accounts"),
    "K": ("Delivery",            "k-delivery"),
    "L": ("CCTV",                "l-cctv"),
    "M": ("AI Support",          "m-ai-support"),
    "N": ("Multi-Branch",        "n-multi-branch"),
}

OFFERING_HEADER_RE = re.compile(
    r"^([A-N])(\d{2})\s+(.+?)\s+\[Phase\s+(\d+)\]\s*$"
)
HTTP_METHODS = {"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"}


def slugify(text: str) -> str:
    """Turn 'Daily Sales Dashboard' into 'daily-sales-dashboard'."""
    text = text.lower()
    text = re.sub(r"&", " and ", text)
    text = re.sub(r"[^a-z0-9]+", "-", text).strip("-")
    return text


def ensure_source_text() -> None:
    if SOURCE_TXT.exists() and SOURCE_TXT.stat().st_size > 0:
        return
    if not SOURCE_DOCX_DEFAULT.exists():
        sys.exit(
            f"Missing source: {SOURCE_TXT} not found and {SOURCE_DOCX_DEFAULT} "
            "is also absent. Provide one of them."
        )
    print(f"[parse-offerings] Converting {SOURCE_DOCX_DEFAULT.name} → source-doc.txt …")
    subprocess.run(
        ["textutil", "-convert", "txt", "-output", str(SOURCE_TXT), str(SOURCE_DOCX_DEFAULT)],
        check=True,
    )


def common_path_prefix(paths: list[str]) -> str:
    """Longest common path-segment prefix (no trailing slash)."""
    split = [p.strip("/").split("/") for p in paths]
    out: list[str] = []
    for parts in zip(*split):
        if len(set(parts)) == 1:
            out.append(parts[0])
        else:
            break
    return "/".join(out)


def parse_offerings(text: str) -> list[dict]:
    lines = text.splitlines()
    offerings: list[dict] = []

    i = 0
    while i < len(lines):
        m = OFFERING_HEADER_RE.match(lines[i])
        if not m:
            i += 1
            continue

        cat_letter, num, name, phase = m.group(1), m.group(2), m.group(3).strip(), int(m.group(4))
        oid = f"{cat_letter}{num}"
        i += 1

        # Description = next non-empty line, but stop if we see Build Steps
        description = ""
        while i < len(lines):
            line = lines[i].strip()
            if not line:
                i += 1
                continue
            if line.startswith("Build Steps"):
                break
            description = line
            i += 1
            break

        # Advance to API Endpoints header (skipping the Build Steps section)
        while i < len(lines) and not lines[i].strip().startswith("API Endpoints"):
            i += 1

        # Skip the three single-word column headers Method / Route / Description
        if i < len(lines) and lines[i].strip().startswith("API Endpoints"):
            i += 1
        for header in ("Method", "Route", "Description"):
            if i < len(lines) and lines[i].strip() == header:
                i += 1

        # Read endpoint triples until blank line or "Frontend Page Features"
        endpoints_raw: list[tuple[str, str, str]] = []
        while i < len(lines):
            raw = lines[i].strip()
            if raw == "" or raw.startswith("Frontend Page Features"):
                break
            method = raw
            if method not in HTTP_METHODS:
                # Defensive: stop if we somehow strayed out of the endpoints block
                break
            i += 1
            if i >= len(lines):
                break
            route = lines[i].strip()
            i += 1
            if i >= len(lines):
                break
            desc = lines[i].strip()
            i += 1
            endpoints_raw.append((method, route, desc))

        # Advance to Frontend Page Features
        while i < len(lines) and not lines[i].strip().startswith("Frontend Page Features"):
            i += 1
        if i < len(lines) and lines[i].strip().startswith("Frontend Page Features"):
            i += 1

        # Read features until "Azure CDN URL:" line
        features: list[str] = []
        cdn_url = ""
        while i < len(lines):
            raw = lines[i].strip()
            if raw.startswith("Azure CDN URL"):
                # Format: "Azure CDN URL: https://..."
                _, _, url = raw.partition(":")
                cdn_url = url.strip()
                i += 1
                break
            if raw:
                features.append(raw)
            i += 1

        # Compute controllerPath = longest common prefix of all endpoint paths
        paths = [e[1] for e in endpoints_raw]
        controller_prefix = common_path_prefix(paths) if paths else f"api/{CATEGORY_DEFS[cat_letter][1].split('-', 1)[1]}"

        # Build endpoint records with relative paths
        endpoints = []
        for method, path, desc in endpoints_raw:
            stripped = path.strip("/")
            rel = stripped[len(controller_prefix):].lstrip("/")
            endpoints.append({
                "method": method,
                "path": stripped,
                "relPath": rel,
                "description": desc,
            })

        cat_name, cat_slug = CATEGORY_DEFS[cat_letter]
        slug = slugify(name)
        # Rewrite CDN URL host to the Food Agentic Mass domain
        new_cdn = re.sub(r"https?://[^/]+", f"https://{CDN_HOST}", cdn_url) if cdn_url else f"https://{CDN_HOST}/offerings/{oid.lower()}/"

        offerings.append({
            "id": oid,
            "idLower": oid.lower(),
            "category": cat_letter,
            "categoryName": cat_name,
            "categorySlug": cat_slug,
            "name": name,
            "slug": slug,
            "folder": f"{oid.lower()}-{slug}",
            "description": description,
            "phase": phase,
            "controllerPath": controller_prefix,
            "endpoints": endpoints,
            "features": features,
            "cdnUrl": new_cdn,
        })

    return offerings


def main() -> None:
    ensure_source_text()
    text = SOURCE_TXT.read_text(encoding="utf-8", errors="replace")
    offerings = parse_offerings(text)

    if len(offerings) != 252:
        print(
            f"[parse-offerings] WARNING: parsed {len(offerings)} offerings, expected 252. "
            "Inspect the source document for formatting drift.",
            file=sys.stderr,
        )

    # Validate IDs cover A01..N18 with no duplicates
    expected = {f"{c}{n:02d}" for c in "ABCDEFGHIJKLMN" for n in range(1, 19)}
    got = {o["id"] for o in offerings}
    missing = sorted(expected - got)
    extra = sorted(got - expected)
    if missing:
        print(f"[parse-offerings] WARNING: missing IDs: {missing}", file=sys.stderr)
    if extra:
        print(f"[parse-offerings] WARNING: unexpected IDs: {extra}", file=sys.stderr)

    payload = {
        "schema": "food-agentic-mass.offerings.v1",
        "generatedAt": "2026-05-18T00:00:00Z",
        "total": len(offerings),
        "cdnHost": CDN_HOST,
        "categories": [
            {"code": c, "name": n, "slug": s}
            for c, (n, s) in CATEGORY_DEFS.items()
        ],
        "offerings": offerings,
    }

    OUTPUT_JSON.write_text(json.dumps(payload, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"[parse-offerings] Wrote {len(offerings)} offerings → {OUTPUT_JSON.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
