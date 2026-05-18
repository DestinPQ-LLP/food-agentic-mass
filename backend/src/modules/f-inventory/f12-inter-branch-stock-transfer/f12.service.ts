import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { F12Entity } from './f12.entity';
import { CreateF12Dto } from './dto/create-f12.dto';
import { UpdateF12Dto } from './dto/update-f12.dto';

/**
 * F12 — Inter-Branch Stock Transfer
 *
 * Initiates and records stock transfers between outlets, updating both branch inventories.
 *
 * Endpoints implemented by F12Controller:
 *   POST   /api/inventory/transfers  — Create transfer request
 *   PUT    /api/inventory/transfers/:id/approve  — Approve transfer
 *   GET    /api/inventory/transfers  — List all transfers
 */
@Injectable()
export class F12Service {
  constructor(
    @InjectRepository(F12Entity)
    private readonly repo: Repository<F12Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`F12 record ${id} not found`);
    return found;
  }

  create(dto: CreateF12Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateF12Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
