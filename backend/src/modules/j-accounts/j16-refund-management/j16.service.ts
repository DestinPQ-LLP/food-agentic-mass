import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { J16Entity } from './j16.entity';
import { CreateJ16Dto } from './dto/create-j16.dto';
import { UpdateJ16Dto } from './dto/update-j16.dto';

/**
 * J16 — Refund Management
 *
 * Processes and records order refunds, updating revenue and cash records accordingly.
 *
 * Endpoints implemented by J16Controller:
 *   POST   /api/accounts/refunds  — Create refund
 *   GET    /api/accounts/refunds  — List refunds
 *   GET    /api/accounts/refunds/summary  — Refund summary for period
 */
@Injectable()
export class J16Service {
  constructor(
    @InjectRepository(J16Entity)
    private readonly repo: Repository<J16Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`J16 record ${id} not found`);
    return found;
  }

  create(dto: CreateJ16Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateJ16Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
