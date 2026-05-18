import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { F13Entity } from './f13.entity';
import { CreateF13Dto } from './dto/create-f13.dto';
import { UpdateF13Dto } from './dto/update-f13.dto';

/**
 * F13 — Inventory Audit Trail
 *
 * Complete log of all stock changes: purchases, adjustments, wastage, and transfers with user and timestamp.
 *
 * Endpoints implemented by F13Controller:
 *   GET    /api/inventory/audit  — Full audit trail
 *   GET    /api/inventory/audit/:itemId  — Audit trail for a specific item
 *   GET    /api/inventory/audit/user/:userId  — Audit trail by user
 */
@Injectable()
export class F13Service {
  constructor(
    @InjectRepository(F13Entity)
    private readonly repo: Repository<F13Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`F13 record ${id} not found`);
    return found;
  }

  create(dto: CreateF13Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateF13Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
