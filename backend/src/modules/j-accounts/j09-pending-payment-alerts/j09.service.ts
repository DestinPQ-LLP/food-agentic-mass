import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { J09Entity } from './j09.entity';
import { CreateJ09Dto } from './dto/create-j09.dto';
import { UpdateJ09Dto } from './dto/update-j09.dto';

/**
 * J09 — Pending Payment Alerts
 *
 * Notifies staff of upcoming or overdue vendor or customer payments.
 *
 * Endpoints implemented by J09Controller:
 *   GET    /api/accounts/alerts/pending  — Pending payment alerts
 *   PUT    /api/accounts/alerts/:id/dismiss  — Dismiss alert
 *   PUT    /api/accounts/alerts/settings  — Configure alert lead time
 */
@Injectable()
export class J09Service {
  constructor(
    @InjectRepository(J09Entity)
    private readonly repo: Repository<J09Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`J09 record ${id} not found`);
    return found;
  }

  create(dto: CreateJ09Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateJ09Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
