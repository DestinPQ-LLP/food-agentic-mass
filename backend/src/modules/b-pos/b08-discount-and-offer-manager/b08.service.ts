import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { B08Entity } from './b08.entity';
import { CreateB08Dto } from './dto/create-b08.dto';
import { UpdateB08Dto } from './dto/update-b08.dto';

/**
 * B08 — Discount & Offer Manager
 *
 * Admin creates offer rules (percentage off, flat discount, item-level offer) that cashiers can apply.
 *
 * Endpoints implemented by B08Controller:
 *   POST   /api/pos/offers  — Create an offer
 *   GET    /api/pos/offers/active  — List active offers
 *   POST   /api/pos/orders/:id/apply-offer  — Apply offer to order
 */
@Injectable()
export class B08Service {
  constructor(
    @InjectRepository(B08Entity)
    private readonly repo: Repository<B08Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`B08 record ${id} not found`);
    return found;
  }

  create(dto: CreateB08Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateB08Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
