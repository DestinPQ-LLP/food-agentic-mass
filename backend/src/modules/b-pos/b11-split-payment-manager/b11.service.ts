import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { B11Entity } from './b11.entity';
import { CreateB11Dto } from './dto/create-b11.dto';
import { UpdateB11Dto } from './dto/update-b11.dto';

/**
 * B11 — Split Payment Manager
 *
 * Allows a single order to be paid partly by cash and partly by UPI or card.
 *
 * Endpoints implemented by B11Controller:
 *   POST   /api/pos/payments/split  — Record a split payment
 *   GET    /api/pos/payments/split/:orderId  — Get split payment details
 *   GET    /api/pos/payments/split/summary  — Daily split payment summary
 */
@Injectable()
export class B11Service {
  constructor(
    @InjectRepository(B11Entity)
    private readonly repo: Repository<B11Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`B11 record ${id} not found`);
    return found;
  }

  create(dto: CreateB11Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateB11Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
