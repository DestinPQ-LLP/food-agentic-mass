import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { C11Entity } from './c11.entity';
import { CreateC11Dto } from './dto/create-c11.dto';
import { UpdateC11Dto } from './dto/update-c11.dto';

/**
 * C11 — Visit Frequency Tracker
 *
 * Shows how often individual customers visit: daily, weekly, monthly, or irregular.
 *
 * Endpoints implemented by C11Controller:
 *   GET    /api/crm/customers/:id/visit-frequency  — Visit frequency for customer
 *   GET    /api/crm/customers/frequency/segments  — Frequency-based segments
 *   GET    /api/crm/customers/frequency/trend  — Frequency trend over time
 */
@Injectable()
export class C11Service {
  constructor(
    @InjectRepository(C11Entity)
    private readonly repo: Repository<C11Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`C11 record ${id} not found`);
    return found;
  }

  create(dto: CreateC11Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateC11Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
