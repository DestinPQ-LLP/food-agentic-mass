import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { C17Entity } from './c17.entity';
import { CreateC17Dto } from './dto/create-c17.dto';
import { UpdateC17Dto } from './dto/update-c17.dto';

/**
 * C17 — Complaint History Tracker
 *
 * Links customer complaints to their profile so staff can see repeat issue patterns at a glance.
 *
 * Endpoints implemented by C17Controller:
 *   GET    /api/crm/customers/:id/complaints  — Complaints by customer
 *   POST   /api/crm/complaints  — Log a complaint
 *   PUT    /api/crm/complaints/:id/resolve  — Resolve complaint
 */
@Injectable()
export class C17Service {
  constructor(
    @InjectRepository(C17Entity)
    private readonly repo: Repository<C17Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`C17 record ${id} not found`);
    return found;
  }

  create(dto: CreateC17Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateC17Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
