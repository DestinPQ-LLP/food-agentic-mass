import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { A17Entity } from './a17.entity';
import { CreateA17Dto } from './dto/create-a17.dto';
import { UpdateA17Dto } from './dto/update-a17.dto';

/**
 * A17 — Exception Report
 *
 * Flags anomalies: unusually high cancellations, stock discrepancies, payment mismatches, and outlier days.
 *
 * Endpoints implemented by A17Controller:
 *   GET    /api/owner/exceptions  — All exceptions for date range
 *   GET    /api/owner/exceptions/unresolved  — Open unresolved exceptions
 *   PUT    /api/owner/exceptions/:id/resolve  — Mark as resolved
 */
@Injectable()
export class A17Service {
  constructor(
    @InjectRepository(A17Entity)
    private readonly repo: Repository<A17Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`A17 record ${id} not found`);
    return found;
  }

  create(dto: CreateA17Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateA17Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
