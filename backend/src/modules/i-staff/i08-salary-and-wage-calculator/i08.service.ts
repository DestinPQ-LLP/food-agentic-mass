import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { I08Entity } from './i08.entity';
import { CreateI08Dto } from './dto/create-i08.dto';
import { UpdateI08Dto } from './dto/update-i08.dto';

/**
 * I08 — Salary & Wage Calculator
 *
 * Calculates wages based on attendance, shift hours, and deductions.
 *
 * Endpoints implemented by I08Controller:
 *   GET    /api/staff/salary/calculate/:staffId  — Calculate salary for period
 *   POST   /api/staff/salary/pay  — Record salary payment
 *   GET    /api/staff/salary/history/:staffId  — Salary payment history
 */
@Injectable()
export class I08Service {
  constructor(
    @InjectRepository(I08Entity)
    private readonly repo: Repository<I08Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`I08 record ${id} not found`);
    return found;
  }

  create(dto: CreateI08Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateI08Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
