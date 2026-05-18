import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { J14Entity } from './j14.entity';
import { CreateJ14Dto } from './dto/create-j14.dto';
import { UpdateJ14Dto } from './dto/update-j14.dto';

/**
 * J14 — Monthly Accounts Report
 *
 * Comprehensive monthly accounts summary for owner review.
 *
 * Endpoints implemented by J14Controller:
 *   GET    /api/accounts/monthly-report  — Monthly accounts report
 *   GET    /api/accounts/monthly-report/pdf  — Download PDF
 *   GET    /api/accounts/monthly-report/compare  — Compare months
 */
@Injectable()
export class J14Service {
  constructor(
    @InjectRepository(J14Entity)
    private readonly repo: Repository<J14Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`J14 record ${id} not found`);
    return found;
  }

  create(dto: CreateJ14Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateJ14Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
