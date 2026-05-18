import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { C05Entity } from './c05.entity';
import { CreateC05Dto } from './dto/create-c05.dto';
import { UpdateC05Dto } from './dto/update-c05.dto';

/**
 * C05 — Loyalty Points Engine
 *
 * Awards points per order and allows redemption at billing, configurable by owner.
 *
 * Endpoints implemented by C05Controller:
 *   POST   /api/crm/loyalty/award  — Award points to customer
 *   POST   /api/crm/loyalty/redeem  — Redeem points on order
 *   GET    /api/crm/loyalty/:customerId/balance  — Get points balance
 */
@Injectable()
export class C05Service {
  constructor(
    @InjectRepository(C05Entity)
    private readonly repo: Repository<C05Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`C05 record ${id} not found`);
    return found;
  }

  create(dto: CreateC05Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateC05Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
