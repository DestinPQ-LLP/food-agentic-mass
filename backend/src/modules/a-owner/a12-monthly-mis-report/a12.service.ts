import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { A12Entity } from './a12.entity';
import { CreateA12Dto } from './dto/create-a12.dto';
import { UpdateA12Dto } from './dto/update-a12.dto';

/**
 * A12 — Monthly MIS Report
 *
 * Comprehensive monthly report with revenue, costs, wastage, top products, and staff summary.
 *
 * Endpoints implemented by A12Controller:
 *   GET    /api/owner/monthly-report  — Monthly aggregated data
 *   GET    /api/owner/monthly-report/pdf  — Download as PDF
 *   GET    /api/owner/monthly-report/compare  — Month-on-month comparison
 */
@Injectable()
export class A12Service {
  constructor(
    @InjectRepository(A12Entity)
    private readonly repo: Repository<A12Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`A12 record ${id} not found`);
    return found;
  }

  create(dto: CreateA12Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateA12Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
