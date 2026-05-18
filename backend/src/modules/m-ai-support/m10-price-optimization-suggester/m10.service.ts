import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { M10Entity } from './m10.entity';
import { CreateM10Dto } from './dto/create-m10.dto';
import { UpdateM10Dto } from './dto/update-m10.dto';

/**
 * M10 — Price Optimization Suggester
 *
 * Analyses price sensitivity and suggests optimal price points for menu items.
 *
 * Endpoints implemented by M10Controller:
 *   GET    /api/ai/pricing/suggestions  — Price optimization suggestions
 *   GET    /api/ai/pricing/sensitivity/:itemId  — Demand sensitivity for item
 *   POST   /api/ai/pricing/simulate  — Simulate revenue impact of price change
 */
@Injectable()
export class M10Service {
  constructor(
    @InjectRepository(M10Entity)
    private readonly repo: Repository<M10Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`M10 record ${id} not found`);
    return found;
  }

  create(dto: CreateM10Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateM10Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
