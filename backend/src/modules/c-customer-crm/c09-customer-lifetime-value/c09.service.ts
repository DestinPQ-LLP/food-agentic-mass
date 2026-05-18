import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { C09Entity } from './c09.entity';
import { CreateC09Dto } from './dto/create-c09.dto';
import { UpdateC09Dto } from './dto/update-c09.dto';

/**
 * C09 — Customer Lifetime Value
 *
 * Calculates and displays total spend, visit count, and average order value per customer.
 *
 * Endpoints implemented by C09Controller:
 *   GET    /api/crm/customers/:id/ltv  — LTV metrics for customer
 *   GET    /api/crm/customers/ltv/top  — Top customers by LTV
 *   GET    /api/crm/customers/ltv/distribution  — LTV distribution histogram
 */
@Injectable()
export class C09Service {
  constructor(
    @InjectRepository(C09Entity)
    private readonly repo: Repository<C09Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`C09 record ${id} not found`);
    return found;
  }

  create(dto: CreateC09Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateC09Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
