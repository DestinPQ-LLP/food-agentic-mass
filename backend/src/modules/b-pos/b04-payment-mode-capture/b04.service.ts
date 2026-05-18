import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { B04Entity } from './b04.entity';
import { CreateB04Dto } from './dto/create-b04.dto';
import { UpdateB04Dto } from './dto/update-b04.dto';

/**
 * B04 — Payment Mode Capture
 *
 * Records how an order is paid: cash, UPI, card, credit, or complimentary.
 *
 * Endpoints implemented by B04Controller:
 *   POST   /api/pos/payments  — Record payment for an order
 *   GET    /api/pos/payments/:orderId  — Get payment for order
 *   GET    /api/pos/payments/summary  — Daily payment mode summary
 */
@Injectable()
export class B04Service {
  constructor(
    @InjectRepository(B04Entity)
    private readonly repo: Repository<B04Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`B04 record ${id} not found`);
    return found;
  }

  create(dto: CreateB04Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateB04Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
