import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { F06Entity } from './f06.entity';
import { CreateF06Dto } from './dto/create-f06.dto';
import { UpdateF06Dto } from './dto/update-f06.dto';

/**
 * F06 — Wastage & Spoilage Logger
 *
 * Records stock that is wasted or spoiled before use, with item, quantity, and reason.
 *
 * Endpoints implemented by F06Controller:
 *   POST   /api/inventory/wastage  — Log inventory wastage
 *   GET    /api/inventory/wastage/today  — Today's wastage
 *   GET    /api/inventory/wastage/items  — Wastage totals by item
 */
@Injectable()
export class F06Service {
  constructor(
    @InjectRepository(F06Entity)
    private readonly repo: Repository<F06Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`F06 record ${id} not found`);
    return found;
  }

  create(dto: CreateF06Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateF06Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
