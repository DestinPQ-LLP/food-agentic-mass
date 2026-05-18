import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { J04Entity } from './j04.entity';
import { CreateJ04Dto } from './dto/create-j04.dto';
import { UpdateJ04Dto } from './dto/update-j04.dto';

/**
 * J04 — Expense Tracker
 *
 * Records business expenses (utilities, maintenance, packaging, miscellaneous) by category.
 *
 * Endpoints implemented by J04Controller:
 *   POST   /api/accounts/expenses  — Log an expense
 *   GET    /api/accounts/expenses  — List expenses
 *   GET    /api/accounts/expenses/summary  — Expense summary by category
 */
@Injectable()
export class J04Service {
  constructor(
    @InjectRepository(J04Entity)
    private readonly repo: Repository<J04Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`J04 record ${id} not found`);
    return found;
  }

  create(dto: CreateJ04Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateJ04Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
