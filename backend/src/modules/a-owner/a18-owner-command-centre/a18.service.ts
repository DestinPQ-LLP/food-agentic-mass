import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { A18Entity } from './a18.entity';
import { CreateA18Dto } from './dto/create-a18.dto';
import { UpdateA18Dto } from './dto/update-a18.dto';

/**
 * A18 — Owner Command Centre
 *
 * Unified single-screen dashboard combining health score, alerts, daily sales, peak hours, and top items.
 *
 * Endpoints implemented by A18Controller:
 *   GET    /api/owner/command-centre  — Full command centre payload
 *   GET    /api/owner/command-centre/live  — Live-updating metrics
 *   GET    /api/owner/command-centre/actions  — Pending action items
 */
@Injectable()
export class A18Service {
  constructor(
    @InjectRepository(A18Entity)
    private readonly repo: Repository<A18Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`A18 record ${id} not found`);
    return found;
  }

  create(dto: CreateA18Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateA18Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
