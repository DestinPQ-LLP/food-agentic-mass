import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { C03Entity } from './c03.entity';
import { CreateC03Dto } from './dto/create-c03.dto';
import { UpdateC03Dto } from './dto/update-c03.dto';

/**
 * C03 — Repeat Customer Detector
 *
 * Automatically flags when a returning customer is identified at billing to enable personalised service.
 *
 * Endpoints implemented by C03Controller:
 *   GET    /api/crm/customers/:id/repeat-status  — Is customer a repeat visitor?
 *   GET    /api/crm/customers/repeat/list  — List all repeat customers
 *   GET    /api/crm/customers/repeat/stats  — Repeat customer statistics
 */
@Injectable()
export class C03Service {
  constructor(
    @InjectRepository(C03Entity)
    private readonly repo: Repository<C03Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`C03 record ${id} not found`);
    return found;
  }

  create(dto: CreateC03Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateC03Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
