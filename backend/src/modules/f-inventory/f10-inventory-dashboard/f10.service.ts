import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { F10Entity } from './f10.entity';
import { CreateF10Dto } from './dto/create-f10.dto';
import { UpdateF10Dto } from './dto/update-f10.dto';

/**
 * F10 — Inventory Dashboard
 *
 * Overview of current stock levels, low-stock items, recent purchases, and wastage for the owner.
 *
 * Endpoints implemented by F10Controller:
 *   GET    /api/inventory/dashboard  — Full inventory dashboard data
 *   GET    /api/inventory/dashboard/critical  — Critical stock items
 *   GET    /api/inventory/dashboard/summary  — Summary KPIs
 */
@Injectable()
export class F10Service {
  constructor(
    @InjectRepository(F10Entity)
    private readonly repo: Repository<F10Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`F10 record ${id} not found`);
    return found;
  }

  create(dto: CreateF10Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateF10Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
