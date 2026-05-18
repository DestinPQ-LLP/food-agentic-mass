import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { B10Entity } from './b10.entity';
import { CreateB10Dto } from './dto/create-b10.dto';
import { UpdateB10Dto } from './dto/update-b10.dto';

/**
 * B10 — Daily Sales Reconciliation
 *
 * End-of-day screen for cashiers to tally cash-in-hand against system-recorded cash orders.
 *
 * Endpoints implemented by B10Controller:
 *   GET    /api/pos/reconciliation/today  — Expected vs actual cash
 *   POST   /api/pos/reconciliation/close  — Submit closing reconciliation
 *   GET    /api/pos/reconciliation/history  — Past reconciliation logs
 */
@Injectable()
export class B10Service {
  constructor(
    @InjectRepository(B10Entity)
    private readonly repo: Repository<B10Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`B10 record ${id} not found`);
    return found;
  }

  create(dto: CreateB10Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateB10Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
