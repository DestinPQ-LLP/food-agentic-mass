import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { C02Entity } from './c02.entity';
import { CreateC02Dto } from './dto/create-c02.dto';
import { UpdateC02Dto } from './dto/update-c02.dto';

/**
 * C02 — Customer Order History
 *
 * Shows all past orders linked to a customer's mobile number with date, items, and spend.
 *
 * Endpoints implemented by C02Controller:
 *   GET    /api/crm/customers/:id/orders  — Customer order history
 *   GET    /api/crm/customers/:id/orders/summary  — Spend and visit summary
 *   GET    /api/crm/customers/:id/orders/favourite-items  — Most ordered items
 */
@Injectable()
export class C02Service {
  constructor(
    @InjectRepository(C02Entity)
    private readonly repo: Repository<C02Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`C02 record ${id} not found`);
    return found;
  }

  create(dto: CreateC02Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateC02Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
