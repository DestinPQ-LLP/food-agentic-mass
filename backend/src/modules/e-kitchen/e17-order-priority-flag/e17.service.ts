import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { E17Entity } from './e17.entity';
import { CreateE17Dto } from './dto/create-e17.dto';
import { UpdateE17Dto } from './dto/update-e17.dto';

/**
 * E17 — Order Priority Flag
 *
 * Marks specific orders as urgent (e.g., VIP, special request) so kitchen handles them first.
 *
 * Endpoints implemented by E17Controller:
 *   PUT    /api/kitchen/orders/:id/priority  — Set order priority
 *   GET    /api/kitchen/orders/priority  — All priority orders
 *   GET    /api/kitchen/orders/priority/count  — Count of priority orders
 */
@Injectable()
export class E17Service {
  constructor(
    @InjectRepository(E17Entity)
    private readonly repo: Repository<E17Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`E17 record ${id} not found`);
    return found;
  }

  create(dto: CreateE17Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateE17Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
