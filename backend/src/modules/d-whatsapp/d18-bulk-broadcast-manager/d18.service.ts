import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { D18Entity } from './d18.entity';
import { CreateD18Dto } from './dto/create-d18.dto';
import { UpdateD18Dto } from './dto/update-d18.dto';

/**
 * D18 — Bulk Broadcast Manager
 *
 * Segment-targeted mass messaging with scheduling, rate-limiting, and delivery reporting.
 *
 * Endpoints implemented by D18Controller:
 *   POST   /api/whatsapp/broadcast  — Create and schedule bulk broadcast
 *   GET    /api/whatsapp/broadcast/:id/report  — Broadcast delivery report
 *   DELETE /api/whatsapp/broadcast/:id  — Cancel scheduled broadcast
 */
@Injectable()
export class D18Service {
  constructor(
    @InjectRepository(D18Entity)
    private readonly repo: Repository<D18Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`D18 record ${id} not found`);
    return found;
  }

  create(dto: CreateD18Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateD18Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
