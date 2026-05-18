import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { C10Entity } from './c10.entity';
import { CreateC10Dto } from './dto/create-c10.dto';
import { UpdateC10Dto } from './dto/update-c10.dto';

/**
 * C10 — Lost Customer Reactivation
 *
 * Identifies customers who haven't visited in N days and sends a re-engagement WhatsApp message.
 *
 * Endpoints implemented by C10Controller:
 *   GET    /api/crm/customers/lapsed  — Lapsed customers list
 *   POST   /api/crm/customers/lapsed/campaign  — Send reactivation campaign
 *   PUT    /api/crm/customers/lapsed/settings  — Configure lapse threshold days
 */
@Injectable()
export class C10Service {
  constructor(
    @InjectRepository(C10Entity)
    private readonly repo: Repository<C10Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`C10 record ${id} not found`);
    return found;
  }

  create(dto: CreateC10Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateC10Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
