import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { A13Entity } from './a13.entity';
import { CreateA13Dto } from './dto/create-a13.dto';
import { UpdateA13Dto } from './dto/update-a13.dto';

/**
 * A13 — Alert & Notification Centre
 *
 * Single inbox for all system alerts: low stock, poor ratings, pending POs, payment mismatches.
 *
 * Endpoints implemented by A13Controller:
 *   GET    /api/owner/alerts  — All active alerts
 *   PUT    /api/owner/alerts/:id/dismiss  — Dismiss an alert
 *   GET    /api/owner/alerts/critical  — Critical unread alerts
 */
@Injectable()
export class A13Service {
  constructor(
    @InjectRepository(A13Entity)
    private readonly repo: Repository<A13Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`A13 record ${id} not found`);
    return found;
  }

  create(dto: CreateA13Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateA13Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
