import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { B07Entity } from './b07.entity';
import { CreateB07Dto } from './dto/create-b07.dto';
import { UpdateB07Dto } from './dto/update-b07.dto';

/**
 * B07 — Order Edit & Cancellation
 *
 * Allows authorised staff to edit items on an order or cancel it before or after billing, with reason logging.
 *
 * Endpoints implemented by B07Controller:
 *   PUT    /api/pos/orders/:id/edit  — Edit order items
 *   POST   /api/pos/orders/:id/cancel  — Cancel order with reason
 *   GET    /api/pos/orders/cancelled  — List cancelled orders today
 */
@Injectable()
export class B07Service {
  constructor(
    @InjectRepository(B07Entity)
    private readonly repo: Repository<B07Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`B07 record ${id} not found`);
    return found;
  }

  create(dto: CreateB07Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateB07Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
