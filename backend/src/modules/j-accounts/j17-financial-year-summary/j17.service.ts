import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { J17Entity } from './j17.entity';
import { CreateJ17Dto } from './dto/create-j17.dto';
import { UpdateJ17Dto } from './dto/update-j17.dto';

/**
 * J17 — Financial Year Summary
 *
 * Annual summary of revenue, expenses, taxes, and profit for financial year review.
 *
 * Endpoints implemented by J17Controller:
 *   GET    /api/accounts/fy-summary  — Financial year summary
 *   GET    /api/accounts/fy-summary/compare  — Year-on-year comparison
 *   GET    /api/accounts/fy-summary/pdf  — Download PDF
 */
@Injectable()
export class J17Service {
  constructor(
    @InjectRepository(J17Entity)
    private readonly repo: Repository<J17Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`J17 record ${id} not found`);
    return found;
  }

  create(dto: CreateJ17Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateJ17Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
