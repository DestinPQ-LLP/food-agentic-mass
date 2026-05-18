import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { F11Entity } from './f11.entity';
import { CreateF11Dto } from './dto/create-f11.dto';
import { UpdateF11Dto } from './dto/update-f11.dto';

/**
 * F11 — Recipe-to-Inventory Mapper
 *
 * Links each menu item to the raw materials it consumes per serving, enabling auto-deduction.
 *
 * Endpoints implemented by F11Controller:
 *   POST   /api/inventory/recipes  — Create item-to-material mapping
 *   GET    /api/inventory/recipes/:itemId  — Get recipe for item
 *   PUT    /api/inventory/recipes/:itemId  — Update recipe mapping
 */
@Injectable()
export class F11Service {
  constructor(
    @InjectRepository(F11Entity)
    private readonly repo: Repository<F11Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`F11 record ${id} not found`);
    return found;
  }

  create(dto: CreateF11Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateF11Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
