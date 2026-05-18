import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { N10Entity } from './n10.entity';
import { CreateN10Dto } from './dto/create-n10.dto';
import { UpdateN10Dto } from './dto/update-n10.dto';

/**
 * N10 — Branch-wise Staff Management
 *
 * Manage staff rosters, attendance, and performance per outlet from a central view.
 *
 * Endpoints implemented by N10Controller:
 *   GET    /api/branches/staff/all  — Staff across all branches
 *   GET    /api/branches/staff/:branchId  — Staff for a branch
 *   POST   /api/branches/staff/transfer  — Transfer staff between branches
 */
@Injectable()
export class N10Service {
  constructor(
    @InjectRepository(N10Entity)
    private readonly repo: Repository<N10Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`N10 record ${id} not found`);
    return found;
  }

  create(dto: CreateN10Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateN10Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
