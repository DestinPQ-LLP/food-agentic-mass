#!/usr/bin/env python3
"""Generate one self-contained static HTML page per offering.

Reads `scripts/offerings-manifest.json` and writes
`frontend/offerings/<id>/index.html` for each of the 252 offerings.

Each page is a single-file HTML+JS app that:
  - Shows the offering ID, name, category, phase, and description
  - Lets the user paste a JWT (stored only in sessionStorage)
  - Has one button per documented endpoint that calls the backend and
    pretty-prints the JSON response
  - Lists the documented Frontend Page Features (visual TODO checklist)
  - Lets the user change the API base URL (defaults to relative `/` so the
    same page works locally with the Vite proxy and in production on the CDN)

Pages are deployed to Azure Blob `$web/offerings/<id>/index.html` by the CI
workflow, served at `https://food-agentic-mass.azureedge.net/offerings/<id>/`.
"""
from __future__ import annotations

import html
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MANIFEST = ROOT / "scripts" / "offerings-manifest.json"
OFFERINGS_DIR = ROOT / "frontend" / "offerings"


CATEGORY_COLORS = {
    "A": "#1e3a8a",  # owner
    "B": "#0f766e",
    "C": "#7c3aed",
    "D": "#16a34a",
    "E": "#ea580c",
    "F": "#0e7490",
    "G": "#9333ea",
    "H": "#dc2626",
    "I": "#0369a1",
    "J": "#65a30d",
    "K": "#d97706",
    "L": "#475569",
    "M": "#be185d",
    "N": "#0891b2",
}


def render_page(o: dict) -> str:
    cat = o["category"]
    accent = CATEGORY_COLORS.get(cat, "#1e3a8a")
    title = html.escape(f"{o['id']} — {o['name']}")
    desc = html.escape(o["description"])
    cat_name = html.escape(o["categoryName"])
    endpoints_json = json.dumps(o["endpoints"])
    features_html = "\n".join(
        f'        <li>{html.escape(f)}</li>' for f in o["features"]
    )

    return f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title} · Food Agentic Mass</title>
  <style>
    :root {{
      --accent: {accent};
      --bg: #f8fafc;
      --card: #ffffff;
      --border: #e2e8f0;
      --text: #0f172a;
      --muted: #64748b;
    }}
    * {{ box-sizing: border-box; }}
    body {{
      margin: 0;
      font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: var(--text);
      background: var(--bg);
      min-height: 100vh;
    }}
    header {{
      background: white;
      border-bottom: 4px solid var(--accent);
      padding: 24px 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 16px;
    }}
    header h1 {{ margin: 0; font-size: 22px; color: var(--accent); }}
    header .meta {{ color: var(--muted); font-size: 13px; margin-top: 4px; }}
    .badges {{ display: flex; gap: 8px; flex-wrap: wrap; }}
    .badge {{
      background: var(--accent); color: white; font-size: 12px; font-weight: 600;
      padding: 4px 10px; border-radius: 999px;
    }}
    .badge.phase {{ background: #f1f5f9; color: var(--accent); border: 1px solid var(--accent); }}
    main {{
      max-width: 1100px; margin: 24px auto; padding: 0 24px 48px;
      display: grid; grid-template-columns: 1fr; gap: 20px;
    }}
    @media (min-width: 920px) {{ main {{ grid-template-columns: 2fr 1fr; }} }}
    .card {{
      background: var(--card); border: 1px solid var(--border); border-radius: 8px;
      padding: 20px; box-shadow: 0 1px 2px rgba(15,23,42,0.04);
    }}
    .card h2 {{ margin: 0 0 12px 0; font-size: 16px; color: var(--accent); }}
    .description {{ color: var(--text); line-height: 1.5; margin: 0 0 12px 0; }}
    .config-row {{ display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px; }}
    .config-row label {{ display: flex; flex-direction: column; font-size: 12px; color: var(--muted); flex: 1; min-width: 180px; }}
    .config-row input {{
      padding: 8px; border: 1px solid var(--border); border-radius: 6px; font-size: 13px;
      font-family: ui-monospace, "SF Mono", Menlo, monospace;
    }}
    .endpoint {{
      display: grid; grid-template-columns: 60px 1fr auto; gap: 12px;
      align-items: center; padding: 10px 0; border-top: 1px solid var(--border);
    }}
    .endpoint:first-child {{ border-top: 0; }}
    .method {{
      font-size: 11px; font-weight: 700; text-align: center; padding: 4px 6px;
      border-radius: 4px; color: white;
    }}
    .method.GET {{ background: #16a34a; }}
    .method.POST {{ background: #2563eb; }}
    .method.PUT {{ background: #d97706; }}
    .method.PATCH {{ background: #9333ea; }}
    .method.DELETE {{ background: #dc2626; }}
    .path {{ font-family: ui-monospace, "SF Mono", Menlo, monospace; font-size: 13px; word-break: break-all; }}
    .path-desc {{ color: var(--muted); font-size: 12px; margin-top: 2px; }}
    .call-btn {{
      background: var(--accent); color: white; border: 0; padding: 8px 12px;
      border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer;
    }}
    .call-btn:hover {{ opacity: 0.9; }}
    .response {{
      font-family: ui-monospace, "SF Mono", Menlo, monospace; font-size: 12px;
      background: #0f172a; color: #f1f5f9; padding: 12px; border-radius: 6px;
      max-height: 240px; overflow: auto; margin-top: 12px; white-space: pre-wrap;
    }}
    ul.features {{ list-style: none; padding: 0; margin: 0; }}
    ul.features li {{
      padding: 8px 12px; border-bottom: 1px solid var(--border); color: var(--text);
      font-size: 13px; display: flex; align-items: center; gap: 8px;
    }}
    ul.features li::before {{ content: "▸"; color: var(--accent); font-weight: bold; }}
    ul.features li:last-child {{ border-bottom: 0; }}
    footer {{ text-align: center; color: var(--muted); font-size: 12px; padding: 24px; }}
    footer a {{ color: var(--accent); text-decoration: none; }}
  </style>
</head>
<body>
  <header>
    <div>
      <h1>{title}</h1>
      <div class="meta">{desc}</div>
    </div>
    <div class="badges">
      <span class="badge">{cat_name}</span>
      <span class="badge phase">Phase {o['phase']}</span>
    </div>
  </header>
  <main>
    <section class="card">
      <h2>API Endpoints</h2>
      <p class="description">All requests are sent to the API base configured below with the JWT in the <code>Authorization: Bearer …</code> header.</p>
      <div class="config-row">
        <label>API base URL
          <input id="apiBase" value="" placeholder="e.g. https://api.foodagenticmass.com" />
        </label>
        <label>JWT (stored in sessionStorage)
          <input id="jwt" type="password" value="" placeholder="paste token" />
        </label>
      </div>
      <div id="endpoints"></div>
      <pre class="response" id="response" hidden></pre>
    </section>
    <aside class="card">
      <h2>Frontend Features</h2>
      <ul class="features">
{features_html}
      </ul>
    </aside>
  </main>
  <footer>
    {o['id']} · <a href="../">All offerings</a> · Food Agentic Mass © DestinPQ LLP
  </footer>
  <script>
    const OFFERING = {json.dumps({"id": o["id"], "name": o["name"], "controllerPath": o["controllerPath"]})};
    const ENDPOINTS = {endpoints_json};

    const apiBaseInput = document.getElementById('apiBase');
    const jwtInput = document.getElementById('jwt');
    const responseEl = document.getElementById('response');

    apiBaseInput.value = sessionStorage.getItem('fam-api-base') || '';
    jwtInput.value = sessionStorage.getItem('fam-jwt') || '';
    apiBaseInput.addEventListener('change', () => sessionStorage.setItem('fam-api-base', apiBaseInput.value));
    jwtInput.addEventListener('change', () => sessionStorage.setItem('fam-jwt', jwtInput.value));

    function renderEndpoints() {{
      const root = document.getElementById('endpoints');
      root.innerHTML = '';
      for (const ep of ENDPOINTS) {{
        const row = document.createElement('div');
        row.className = 'endpoint';
        const m = document.createElement('span');
        m.className = `method ${{ep.method}}`;
        m.textContent = ep.method;
        const p = document.createElement('div');
        p.innerHTML = `<div class="path">/${{ep.path}}</div><div class="path-desc">${{ep.description.replace(/[<>&]/g, c => ({{ '<': '&lt;', '>': '&gt;', '&': '&amp;' }})[c])}}</div>`;
        const btn = document.createElement('button');
        btn.className = 'call-btn';
        btn.textContent = 'Call';
        btn.onclick = () => callEndpoint(ep);
        row.appendChild(m);
        row.appendChild(p);
        row.appendChild(btn);
        root.appendChild(row);
      }}
    }}

    async function callEndpoint(ep) {{
      const base = (apiBaseInput.value || '').replace(/\\/+$/, '');
      const url = `${{base}}/${{ep.path}}`.replace(':id', 'demo-id').replace(/\\/:([^/]+)/g, '/demo-$1');
      const opts = {{
        method: ep.method,
        headers: {{
          'Accept': 'application/json',
          ...(jwtInput.value ? {{ 'Authorization': `Bearer ${{jwtInput.value}}` }} : {{}}),
        }},
      }};
      if (['POST', 'PUT', 'PATCH'].includes(ep.method)) {{
        opts.headers['Content-Type'] = 'application/json';
        opts.body = JSON.stringify({{ data: {{}} }});
      }}
      responseEl.hidden = false;
      responseEl.textContent = `→ ${{ep.method}} ${{url}}\\n…`;
      try {{
        const res = await fetch(url, opts);
        const text = await res.text();
        let pretty = text;
        try {{ pretty = JSON.stringify(JSON.parse(text), null, 2); }} catch (_) {{ /* leave as-is */ }}
        responseEl.textContent = `→ ${{ep.method}} ${{url}}\\n← HTTP ${{res.status}} ${{res.statusText}}\\n\\n${{pretty}}`;
      }} catch (err) {{
        responseEl.textContent = `→ ${{ep.method}} ${{url}}\\n← ERROR\\n\\n${{err && err.message || err}}`;
      }}
    }}

    renderEndpoints();
  </script>
</body>
</html>
"""


def render_index(offerings: list[dict]) -> str:
    rows = []
    for o in offerings:
        accent = CATEGORY_COLORS.get(o["category"], "#1e3a8a")
        rows.append(
            f'<a class="tile" style="--accent:{accent}" href="{o["idLower"]}/">'
            f'<div class="tile-id">{o["id"]}</div>'
            f'<div class="tile-name">{html.escape(o["name"])}</div>'
            f'<div class="tile-meta">{html.escape(o["categoryName"])} · Phase {o["phase"]}</div>'
            f'</a>'
        )
    rows_html = "\n      ".join(rows)
    return f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Food Agentic Mass · 252 Offerings</title>
  <style>
    body {{ margin: 0; font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; background: #f8fafc; color: #0f172a; }}
    header {{ background: white; padding: 24px 32px; border-bottom: 1px solid #e2e8f0; }}
    header h1 {{ margin: 0; color: #1e3a8a; font-size: 22px; }}
    header p {{ margin: 4px 0 0 0; color: #64748b; font-size: 14px; }}
    main {{ max-width: 1280px; margin: 24px auto; padding: 0 24px 48px; }}
    .grid {{ display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 12px; }}
    .tile {{
      display: block; text-decoration: none; background: white; border: 1px solid #e2e8f0;
      border-left: 4px solid var(--accent); border-radius: 6px; padding: 12px 14px;
      color: #0f172a; transition: transform 0.1s, box-shadow 0.1s;
    }}
    .tile:hover {{ transform: translateY(-1px); box-shadow: 0 4px 10px rgba(15,23,42,0.08); }}
    .tile-id {{ font-weight: 700; font-size: 14px; color: var(--accent); }}
    .tile-name {{ font-size: 13px; margin-top: 2px; }}
    .tile-meta {{ font-size: 11px; color: #64748b; margin-top: 4px; }}
  </style>
</head>
<body>
  <header>
    <h1>Food Agentic Mass · 252 AI Automation Offerings</h1>
    <p>Click any offering to open its dedicated page. All pages share the same NestJS API.</p>
  </header>
  <main>
    <div class="grid">
      {rows_html}
    </div>
  </main>
</body>
</html>
"""


def main() -> None:
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    offerings = manifest["offerings"]
    OFFERINGS_DIR.mkdir(parents=True, exist_ok=True)

    for o in offerings:
        folder = OFFERINGS_DIR / o["idLower"]
        folder.mkdir(parents=True, exist_ok=True)
        (folder / "index.html").write_text(render_page(o), encoding="utf-8")

    (OFFERINGS_DIR / "index.html").write_text(render_index(offerings), encoding="utf-8")
    print(f"[generate-frontend] Wrote {len(offerings)} offering pages + offerings/index.html")


if __name__ == "__main__":
    main()
