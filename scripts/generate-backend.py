#!/usr/bin/env python3
"""Generate the 252 NestJS module folders + a registry from the manifest.

Reads `scripts/offerings-manifest.json` and writes:

  backend/src/modules/<category-slug>/<offering-folder>/
    <id>.module.ts
    <id>.controller.ts
    <id>.service.ts
    <id>.entity.ts
    dto/create-<id>.dto.ts
    dto/update-<id>.dto.ts

…and a top-level `backend/src/modules/registry.ts` exporting an
`OfferingModules` array consumed by `backend/src/app.module.ts`.
"""
from __future__ import annotations

import json
import re
import textwrap
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MANIFEST = ROOT / "scripts" / "offerings-manifest.json"
MODULES_ROOT = ROOT / "backend" / "src" / "modules"

# Map an HTTP method (in the manifest) → (Nest decorator, default role-set)
ROLE_DEFAULTS_BY_METHOD = {
    "GET":    "Role.OWNER, Role.MANAGER, Role.ADMIN",
    "POST":   "Role.OWNER, Role.MANAGER, Role.ADMIN",
    "PUT":    "Role.OWNER, Role.MANAGER, Role.ADMIN",
    "PATCH":  "Role.OWNER, Role.MANAGER, Role.ADMIN",
    "DELETE": "Role.OWNER, Role.ADMIN",
}

PASCAL_RE = re.compile(r"(^|[-_/\s]+)(\w)")


def pascal(text: str) -> str:
    return PASCAL_RE.sub(lambda m: m.group(2).upper(), text)


def class_id(offering_id: str) -> str:
    # "a01" → "A01"
    return offering_id.upper()


def method_name(method: str, rel: str) -> str:
    """Pick a TypeScript method name for an endpoint.

    Combines the HTTP verb with the relative path. Examples:
      GET    ''                 → get
      GET    'items'            → getItems
      GET    'items/:id'        → getItemsById
      POST   ''                 → create
      PUT    ':id/progress'     → updateByIdProgress
    """
    rel = rel.strip("/")
    if not rel:
        return {
            "GET": "list",
            "POST": "create",
            "PUT": "update",
            "PATCH": "patch",
            "DELETE": "remove",
        }.get(method, method.lower())

    parts = []
    for seg in rel.split("/"):
        if seg.startswith(":"):
            parts.append(f"By{pascal(seg[1:])}")
        else:
            parts.append(pascal(seg))
    suffix = "".join(parts) or "Root"
    prefix = {
        "GET": "get",
        "POST": "create",
        "PUT": "update",
        "PATCH": "patch",
        "DELETE": "remove",
    }.get(method, method.lower())
    # PascalCase the first letter of the suffix so we get e.g. updateByIdProgress (not updatebyIdProgress)
    if suffix:
        suffix = suffix[0].upper() + suffix[1:]
    return prefix + suffix


def rel_path_to_decorator_arg(rel: str) -> str:
    rel = rel.strip("/")
    return f"'{rel}'" if rel else ""


def params_from_rel(rel: str) -> list[str]:
    return [seg[1:] for seg in rel.strip("/").split("/") if seg.startswith(":")]


def render_module_file(o: dict) -> str:
    cls = class_id(o["id"])
    return (
        f"import {{ Module }} from '@nestjs/common';\n"
        f"import {{ TypeOrmModule }} from '@nestjs/typeorm';\n"
        f"import {{ {cls}Controller }} from './{o['idLower']}.controller';\n"
        f"import {{ {cls}Service }} from './{o['idLower']}.service';\n"
        f"import {{ {cls}Entity }} from './{o['idLower']}.entity';\n"
        f"\n"
        f"@Module({{\n"
        f"  imports: [TypeOrmModule.forFeature([{cls}Entity])],\n"
        f"  controllers: [{cls}Controller],\n"
        f"  providers: [{cls}Service],\n"
        f"  exports: [{cls}Service],\n"
        f"}})\n"
        f"export class {cls}Module {{}}\n"
    )


def render_entity_file(o: dict) -> str:
    cls = class_id(o["id"])
    return (
        f"import {{\n"
        f"  Entity,\n"
        f"  PrimaryGeneratedColumn,\n"
        f"  Column,\n"
        f"  CreateDateColumn,\n"
        f"  UpdateDateColumn,\n"
        f"  Index,\n"
        f"}} from 'typeorm';\n"
        f"\n"
        f"/**\n"
        f" * {cls} — {o['name']}\n"
        f" * {o['description']}\n"
        f" *\n"
        f" * Phase {o['phase']}. Category: {o['categoryName']}.\n"
        f" */\n"
        f"@Entity('{o['idLower']}_records')\n"
        f"export class {cls}Entity {{\n"
        f"  @PrimaryGeneratedColumn('uuid')\n"
        f"  id: string;\n"
        f"\n"
        f"  @Index()\n"
        f"  @Column({{ type: 'varchar', length: 64, nullable: true }})\n"
        f"  branchId?: string;\n"
        f"\n"
        f"  // Free-form domain payload until offering-specific columns are defined.\n"
        f"  @Column({{ type: 'jsonb', default: () => \"'{{}}'\" }})\n"
        f"  data: Record<string, any>;\n"
        f"\n"
        f"  @Column({{ type: 'varchar', length: 32, nullable: true }})\n"
        f"  status?: string;\n"
        f"\n"
        f"  @CreateDateColumn({{ type: 'timestamptz' }})\n"
        f"  createdAt: Date;\n"
        f"\n"
        f"  @UpdateDateColumn({{ type: 'timestamptz' }})\n"
        f"  updatedAt: Date;\n"
        f"}}\n"
    )


def render_create_dto(o: dict) -> str:
    cls = class_id(o["id"])
    return (
        f"import {{ ApiProperty, ApiPropertyOptional }} from '@nestjs/swagger';\n"
        f"import {{ IsObject, IsOptional, IsString }} from 'class-validator';\n"
        f"\n"
        f"export class Create{cls}Dto {{\n"
        f"  @ApiPropertyOptional({{ description: 'Branch the record belongs to' }})\n"
        f"  @IsOptional()\n"
        f"  @IsString()\n"
        f"  branchId?: string;\n"
        f"\n"
        f"  @ApiPropertyOptional({{ description: 'Optional status flag (e.g. draft, active, archived)' }})\n"
        f"  @IsOptional()\n"
        f"  @IsString()\n"
        f"  status?: string;\n"
        f"\n"
        f"  @ApiProperty({{\n"
        f"    description: '{o['name']} payload (offering-specific JSON shape; refine when business rules are known)',\n"
        f"    type: 'object',\n"
        f"    additionalProperties: true,\n"
        f"    example: {{}},\n"
        f"  }})\n"
        f"  @IsObject()\n"
        f"  data: Record<string, any>;\n"
        f"}}\n"
    )


def render_update_dto(o: dict) -> str:
    cls = class_id(o["id"])
    return (
        f"import {{ PartialType }} from '@nestjs/swagger';\n"
        f"import {{ Create{cls}Dto }} from './create-{o['idLower']}.dto';\n"
        f"\n"
        f"export class Update{cls}Dto extends PartialType(Create{cls}Dto) {{}}\n"
    )


def render_service_file(o: dict) -> str:
    cls = class_id(o["id"])
    endpoint_doc = "\n".join(
        f" *   {ep['method']:<6} /{ep['path']}  — {ep['description']}"
        for ep in o["endpoints"]
    )
    return (
        f"import {{ Injectable, NotFoundException }} from '@nestjs/common';\n"
        f"import {{ InjectRepository }} from '@nestjs/typeorm';\n"
        f"import {{ Repository }} from 'typeorm';\n"
        f"import {{ {cls}Entity }} from './{o['idLower']}.entity';\n"
        f"import {{ Create{cls}Dto }} from './dto/create-{o['idLower']}.dto';\n"
        f"import {{ Update{cls}Dto }} from './dto/update-{o['idLower']}.dto';\n"
        f"\n"
        f"/**\n"
        f" * {cls} — {o['name']}\n"
        f" *\n"
        f" * {o['description']}\n"
        f" *\n"
        f" * Endpoints implemented by {cls}Controller:\n"
        f"{endpoint_doc}\n"
        f" */\n"
        f"@Injectable()\n"
        f"export class {cls}Service {{\n"
        f"  constructor(\n"
        f"    @InjectRepository({cls}Entity)\n"
        f"    private readonly repo: Repository<{cls}Entity>,\n"
        f"  ) {{}}\n"
        f"\n"
        f"  list(branchId?: string) {{\n"
        f"    return this.repo.find({{\n"
        f"      where: branchId ? {{ branchId }} : undefined,\n"
        f"      order: {{ createdAt: 'DESC' }},\n"
        f"    }});\n"
        f"  }}\n"
        f"\n"
        f"  async findOne(id: string) {{\n"
        f"    const found = await this.repo.findOne({{ where: {{ id }} }});\n"
        f"    if (!found) throw new NotFoundException(`{cls} record ${{id}} not found`);\n"
        f"    return found;\n"
        f"  }}\n"
        f"\n"
        f"  create(dto: Create{cls}Dto) {{\n"
        f"    const entity = this.repo.create(dto);\n"
        f"    return this.repo.save(entity);\n"
        f"  }}\n"
        f"\n"
        f"  async update(id: string, dto: Update{cls}Dto) {{\n"
        f"    await this.repo.update(id, dto as any);\n"
        f"    return this.findOne(id);\n"
        f"  }}\n"
        f"\n"
        f"  async remove(id: string) {{\n"
        f"    const found = await this.findOne(id);\n"
        f"    await this.repo.remove(found);\n"
        f"    return {{ ok: true }};\n"
        f"  }}\n"
        f"}}\n"
    )


def render_controller_file(o: dict) -> str:
    cls = class_id(o["id"])
    controller_path = o["controllerPath"].lstrip("/")
    id_lower = o["idLower"]

    # Track decorators / Nest imports we actually need
    needed_decorators: set[str] = {"Controller"}
    needed_param_decorators: set[str] = set()
    used_create_dto = False
    used_update_dto = False

    handler_blocks: list[str] = []
    seen_handler_names: set[str] = set()

    for ep in o["endpoints"]:
        verb = ep["method"]
        decorator = {
            "GET": "Get",
            "POST": "Post",
            "PUT": "Put",
            "PATCH": "Patch",
            "DELETE": "Delete",
        }.get(verb, verb.capitalize())
        needed_decorators.add(decorator)
        rel_arg = rel_path_to_decorator_arg(ep["relPath"])
        roles = ROLE_DEFAULTS_BY_METHOD.get(verb, "Role.ADMIN")

        base_name = method_name(verb, ep["relPath"])
        name = base_name
        n = 2
        while name in seen_handler_names:
            name = f"{base_name}{n}"
            n += 1
        seen_handler_names.add(name)

        path_params = params_from_rel(ep["relPath"])
        params: list[str] = []
        for p in path_params:
            params.append(f"@Param('{p}') {p}: string")
            needed_param_decorators.add("Param")

        body_used = False
        if verb == "POST":
            params.append(f"@Body() dto: Create{cls}Dto")
            needed_param_decorators.add("Body")
            used_create_dto = True
            body_used = True
        elif verb in ("PUT", "PATCH"):
            params.append(f"@Body() dto: Update{cls}Dto")
            needed_param_decorators.add("Body")
            used_update_dto = True
            body_used = True

        if verb == "GET" and not path_params:
            params.append("@Query('branchId') branchId?: string")
            needed_param_decorators.add("Query")

        if verb == "GET" and not path_params:
            body = "return this.service.list(branchId);"
        elif verb == "GET" and path_params == ["id"]:
            body = "return this.service.findOne(id);"
        elif verb == "POST" and not path_params:
            body = "return this.service.create(dto);"
        elif verb in ("PUT", "PATCH") and "id" in path_params and len(path_params) == 1:
            body = "return this.service.update(id, dto);"
        elif verb == "DELETE" and path_params == ["id"]:
            body = "return this.service.remove(id);"
        else:
            arg_keys: list[str] = list(path_params)
            if body_used:
                arg_keys.append("dto")
            arg_obj = ", ".join(arg_keys) if arg_keys else ""
            body = (
                f"// TODO ({cls}): implement {verb} /{ep['path']} — {ep['description']}\n"
                f"    return {{ ok: true, endpoint: '{ep['path']}', args: {{ {arg_obj} }} }};"
            )

        params_str = ", ".join(params)
        comment = f"  /** {verb} /{ep['path']} — {ep['description']} */"
        decorator_line = f"  @{decorator}({rel_arg})" if rel_arg else f"  @{decorator}()"
        roles_line = f"  @Roles({roles})"
        sig_line = f"  {name}({params_str}) {{"
        body_lines = body.splitlines()
        if len(body_lines) == 1:
            method_body = f"    {body_lines[0]}"
        else:
            method_body = "\n".join("    " + ln for ln in body_lines)
        close_line = "  }"

        handler_blocks.append("\n".join([
            comment,
            decorator_line,
            roles_line,
            sig_line,
            method_body,
            close_line,
        ]))

    handlers_str = "\n\n".join(handler_blocks)

    common_imports = ["Controller"]
    other_decorators = sorted(d for d in needed_decorators if d != "Controller")
    other_param = sorted(needed_param_decorators)
    nest_imports = ", ".join(common_imports + other_decorators + other_param)

    dto_imports: list[str] = []
    if used_create_dto:
        dto_imports.append(
            f"import {{ Create{cls}Dto }} from './dto/create-{id_lower}.dto';"
        )
    if used_update_dto:
        dto_imports.append(
            f"import {{ Update{cls}Dto }} from './dto/update-{id_lower}.dto';"
        )
    dto_imports_str = ("\n" + "\n".join(dto_imports)) if dto_imports else ""

    return (
        f"import {{ {nest_imports} }} from '@nestjs/common';\n"
        f"import {{ ApiBearerAuth, ApiTags }} from '@nestjs/swagger';\n"
        f"import {{ {cls}Service }} from './{id_lower}.service';"
        f"{dto_imports_str}\n"
        f"import {{ Roles }} from '../../../common/decorators/roles.decorator';\n"
        f"import {{ Role }} from '../../../common/enums/role.enum';\n"
        f"\n"
        f"/**\n"
        f" * {cls} — {o['name']}\n"
        f" *\n"
        f" * {o['description']}\n"
        f" *\n"
        f" * Category: {o['categoryName']}  ·  Phase {o['phase']}\n"
        f" * Frontend: {o['cdnUrl']}\n"
        f" */\n"
        f"@ApiTags('{cls} - {o['name']}')\n"
        f"@ApiBearerAuth()\n"
        f"@Controller('{controller_path}')\n"
        f"export class {cls}Controller {{\n"
        f"  constructor(private readonly service: {cls}Service) {{}}\n"
        f"\n"
        f"{handlers_str}\n"
        f"}}\n"
    )


def write_offering_files(o: dict) -> None:
    folder = MODULES_ROOT / o["categorySlug"] / o["folder"]
    dto_folder = folder / "dto"
    folder.mkdir(parents=True, exist_ok=True)
    dto_folder.mkdir(parents=True, exist_ok=True)

    files = {
        folder / f"{o['idLower']}.module.ts":      render_module_file(o),
        folder / f"{o['idLower']}.entity.ts":      render_entity_file(o),
        folder / f"{o['idLower']}.service.ts":     render_service_file(o),
        folder / f"{o['idLower']}.controller.ts":  render_controller_file(o),
        dto_folder / f"create-{o['idLower']}.dto.ts": render_create_dto(o),
        dto_folder / f"update-{o['idLower']}.dto.ts": render_update_dto(o),
    }
    for path, content in files.items():
        path.write_text(content, encoding="utf-8")


def write_registry(offerings: list[dict]) -> None:
    """Emit a registry.ts that imports every offering module and exports them as an array."""
    by_cat: dict[str, list[dict]] = {}
    for o in offerings:
        by_cat.setdefault(o["category"], []).append(o)

    lines: list[str] = [
        "/* AUTO-GENERATED by scripts/generate-backend.py — do not edit by hand. */",
        "/* Re-run: python3 scripts/generate-backend.py */",
        "",
    ]
    # Imports
    for cat_letter in sorted(by_cat.keys()):
        lines.append(f"// === Category {cat_letter} ({by_cat[cat_letter][0]['categoryName']}) ===")
        for o in by_cat[cat_letter]:
            cls = class_id(o["id"])
            lines.append(
                f"import {{ {cls}Module }} from './{o['categorySlug']}/{o['folder']}/{o['idLower']}.module';"
            )
        lines.append("")

    lines.append("export const OfferingModules = [")
    for cat_letter in sorted(by_cat.keys()):
        lines.append(f"  // Category {cat_letter}")
        for o in by_cat[cat_letter]:
            cls = class_id(o["id"])
            lines.append(f"  {cls}Module,")
    lines.append("];")
    lines.append("")

    (MODULES_ROOT / "registry.ts").write_text("\n".join(lines), encoding="utf-8")


def write_app_module(offerings: list[dict]) -> None:
    """Emit backend/src/app.module.ts that consumes the registry."""
    content = (
        f"/* AUTO-GENERATED by scripts/generate-backend.py — do not edit by hand. */\n"
        f"/* Re-run: python3 scripts/generate-backend.py */\n"
        f"import {{ Module }} from '@nestjs/common';\n"
        f"import {{ ConfigModule }} from '@nestjs/config';\n"
        f"import {{ ScheduleModule }} from '@nestjs/schedule';\n"
        f"import configuration from './config/configuration';\n"
        f"import {{ DatabaseModule }} from './database/database.module';\n"
        f"import {{ CommonModule }} from './common/common.module';\n"
        f"import {{ AuthModule }} from './auth/auth.module';\n"
        f"import {{ HealthModule }} from './health/health.module';\n"
        f"import {{ OfferingModules }} from './modules/registry';\n"
        f"\n"
        f"@Module({{\n"
        f"  imports: [\n"
        f"    ConfigModule.forRoot({{ isGlobal: true, load: [configuration] }}),\n"
        f"    ScheduleModule.forRoot(),\n"
        f"    DatabaseModule,\n"
        f"    CommonModule,\n"
        f"    AuthModule,\n"
        f"    HealthModule,\n"
        f"    ...OfferingModules, // {len(offerings)} offering modules\n"
        f"  ],\n"
        f"}})\n"
        f"export class AppModule {{}}\n"
    )
    (ROOT / "backend" / "src" / "app.module.ts").write_text(content, encoding="utf-8")


def main() -> None:
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    offerings = manifest["offerings"]
    print(f"[generate-backend] Generating {len(offerings)} modules under {MODULES_ROOT.relative_to(ROOT)} …")
    MODULES_ROOT.mkdir(parents=True, exist_ok=True)
    for o in offerings:
        write_offering_files(o)
    write_registry(offerings)
    write_app_module(offerings)
    print(f"[generate-backend] Wrote {len(offerings)} offering folders + registry.ts + app.module.ts")


if __name__ == "__main__":
    main()
