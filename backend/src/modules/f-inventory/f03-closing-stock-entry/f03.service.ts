import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { F03Entity } from './f03.entity';
import { CreateF03Dto } from './dto/create-f03.dto';
import { UpdateF03Dto } from './dto/update-f03.dto';

/**
 * F03 — Closing Stock Entry
 *
 * End-of-day screen for physically counted stock quantities, enabling variance calculation.
 *
 * Endpoints implemented by F03Controller:
 *   POST   /api/inventory/stock/closing  — Submit closing stock
 *   GET    /api/inventory/stock/closing/today  — Today's closing stock
 *   GET    /api/inventory/stock/variance/today  — Today's stock variance
 */
@Injectable()
export class F03Service {
  constructor(
    @InjectRepository(F03Entity)
    private readonly repo: Repository<F03Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`F03 record ${id} not found`);
    return found;
  }

  create(dto: CreateF03Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateF03Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
