import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { B13Entity } from './b13.entity';
import { CreateB13Dto } from './dto/create-b13.dto';
import { UpdateB13Dto } from './dto/update-b13.dto';

/**
 * B13 — Bulk/Catering Order Entry
 *
 * Special order screen for large or catering orders with advance booking, delivery date, and custom items.
 *
 * Endpoints implemented by B13Controller:
 *   POST   /api/pos/orders/bulk  — Create a bulk order
 *   GET    /api/pos/orders/bulk  — List upcoming bulk orders
 *   PUT    /api/pos/orders/bulk/:id/status  — Update bulk order status
 */
@Injectable()
export class B13Service {
  constructor(
    @InjectRepository(B13Entity)
    private readonly repo: Repository<B13Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`B13 record ${id} not found`);
    return found;
  }

  create(dto: CreateB13Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateB13Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
