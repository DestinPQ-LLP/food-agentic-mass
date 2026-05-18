import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { B14Entity } from './b14.entity';
import { CreateB14Dto } from './dto/create-b14.dto';
import { UpdateB14Dto } from './dto/update-b14.dto';

/**
 * B14 — Pending Orders Queue
 *
 * Live view of all orders that are open or partially prepared so nothing is missed during busy hours.
 *
 * Endpoints implemented by B14Controller:
 *   GET    /api/pos/orders/pending  — All pending orders
 *   PUT    /api/pos/orders/:id/priority  — Flag as priority
 *   GET    /api/pos/orders/pending/count  — Count of pending orders
 */
@Injectable()
export class B14Service {
  constructor(
    @InjectRepository(B14Entity)
    private readonly repo: Repository<B14Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`B14 record ${id} not found`);
    return found;
  }

  create(dto: CreateB14Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateB14Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
