import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { B18Entity } from './b18.entity';
import { CreateB18Dto } from './dto/create-b18.dto';
import { UpdateB18Dto } from './dto/update-b18.dto';

/**
 * B18 — Offline Order Queue
 *
 * Queues orders locally in the browser when internet is down and syncs to server when connectivity returns.
 *
 * Endpoints implemented by B18Controller:
 *   POST   /api/pos/orders/sync  — Sync offline orders to server
 *   GET    /api/pos/orders/sync/status  — Check sync status
 *   GET    /api/pos/orders/offline-queue  — List locally queued orders
 */
@Injectable()
export class B18Service {
  constructor(
    @InjectRepository(B18Entity)
    private readonly repo: Repository<B18Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`B18 record ${id} not found`);
    return found;
  }

  create(dto: CreateB18Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateB18Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
