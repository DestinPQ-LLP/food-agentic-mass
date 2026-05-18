import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { C04Entity } from './c04.entity';
import { CreateC04Dto } from './dto/create-c04.dto';
import { UpdateC04Dto } from './dto/update-c04.dto';

/**
 * C04 — Customer Preferences Tracker
 *
 * Tracks and stores item preferences, dietary notes, and special requests per customer.
 *
 * Endpoints implemented by C04Controller:
 *   PUT    /api/crm/customers/:id/preferences  — Save customer preferences
 *   GET    /api/crm/customers/:id/preferences  — Get customer preferences
 *   GET    /api/crm/customers/preferences/popular  — Most common preferences
 */
@Injectable()
export class C04Service {
  constructor(
    @InjectRepository(C04Entity)
    private readonly repo: Repository<C04Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`C04 record ${id} not found`);
    return found;
  }

  create(dto: CreateC04Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateC04Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
