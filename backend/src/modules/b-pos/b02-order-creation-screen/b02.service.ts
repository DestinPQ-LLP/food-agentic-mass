import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { B02Entity } from './b02.entity';
import { CreateB02Dto } from './dto/create-b02.dto';
import { UpdateB02Dto } from './dto/update-b02.dto';

/**
 * B02 — Order Creation Screen
 *
 * Full order workflow: select items, set quantity, tag customer, choose dine-in/takeaway, and confirm.
 *
 * Endpoints implemented by B02Controller:
 *   POST   /api/pos/orders  — Create a new order
 *   GET    /api/pos/orders/:id  — Fetch order details
 *   PUT    /api/pos/orders/:id  — Update order before payment
 */
@Injectable()
export class B02Service {
  constructor(
    @InjectRepository(B02Entity)
    private readonly repo: Repository<B02Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`B02 record ${id} not found`);
    return found;
  }

  create(dto: CreateB02Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateB02Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
