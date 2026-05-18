import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { C16Entity } from './c16.entity';
import { CreateC16Dto } from './dto/create-c16.dto';
import { UpdateC16Dto } from './dto/update-c16.dto';

/**
 * C16 — Customer Profile Dashboard
 *
 * Full customer profile: contact, segments, LTV, order history, preferences, and feedback.
 *
 * Endpoints implemented by C16Controller:
 *   GET    /api/crm/customers/:id/profile  — Full customer profile
 *   PUT    /api/crm/customers/:id/profile  — Update profile fields
 *   GET    /api/crm/customers/:id/activity  — Customer activity timeline
 */
@Injectable()
export class C16Service {
  constructor(
    @InjectRepository(C16Entity)
    private readonly repo: Repository<C16Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`C16 record ${id} not found`);
    return found;
  }

  create(dto: CreateC16Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateC16Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
