import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { G11Entity } from './g11.entity';
import { CreateG11Dto } from './dto/create-g11.dto';
import { UpdateG11Dto } from './dto/update-g11.dto';

/**
 * G11 — Delivery Status Monitor
 *
 * Tracks expected vs actual delivery dates for each PO line item.
 *
 * Endpoints implemented by G11Controller:
 *   PUT    /api/vendors/purchase-orders/:id/delivery  — Update delivery status
 *   GET    /api/vendors/purchase-orders/overdue  — Overdue deliveries
 *   GET    /api/vendors/purchase-orders/expected-today  — Expected deliveries today
 */
@Injectable()
export class G11Service {
  constructor(
    @InjectRepository(G11Entity)
    private readonly repo: Repository<G11Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`G11 record ${id} not found`);
    return found;
  }

  create(dto: CreateG11Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateG11Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
