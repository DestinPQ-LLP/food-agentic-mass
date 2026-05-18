import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { K06Entity } from './k06.entity';
import { CreateK06Dto } from './dto/create-k06.dto';
import { UpdateK06Dto } from './dto/update-k06.dto';

/**
 * K06 — Delivery Confirmation Screen
 *
 * Agent confirms successful delivery with customer signature or photo proof.
 *
 * Endpoints implemented by K06Controller:
 *   POST   /api/delivery/orders/:id/confirm  — Confirm delivery
 *   GET    /api/delivery/orders/:id/proof  — Get delivery proof
 *   GET    /api/delivery/orders/confirmed  — Confirmed deliveries today
 */
@Injectable()
export class K06Service {
  constructor(
    @InjectRepository(K06Entity)
    private readonly repo: Repository<K06Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`K06 record ${id} not found`);
    return found;
  }

  create(dto: CreateK06Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateK06Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
