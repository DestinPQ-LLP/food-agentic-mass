import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { F07Entity } from './f07.entity';
import { CreateF07Dto } from './dto/create-f07.dto';
import { UpdateF07Dto } from './dto/update-f07.dto';

/**
 * F07 — Low Stock Alert Engine
 *
 * Auto-detects items below reorder level and generates alerts for owner and procurement team.
 *
 * Endpoints implemented by F07Controller:
 *   GET    /api/inventory/alerts/low-stock  — All low-stock alerts
 *   PUT    /api/inventory/items/:id/reorder-level  — Update reorder level
 *   POST   /api/inventory/alerts/low-stock/acknowledge  — Acknowledge alert
 */
@Injectable()
export class F07Service {
  constructor(
    @InjectRepository(F07Entity)
    private readonly repo: Repository<F07Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`F07 record ${id} not found`);
    return found;
  }

  create(dto: CreateF07Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateF07Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
