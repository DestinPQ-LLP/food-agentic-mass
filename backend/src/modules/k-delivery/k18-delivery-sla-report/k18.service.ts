import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { K18Entity } from './k18.entity';
import { CreateK18Dto } from './dto/create-k18.dto';
import { UpdateK18Dto } from './dto/update-k18.dto';

/**
 * K18 — Delivery SLA Report
 *
 * Tracks performance against delivery time SLAs: on-time vs late by zone and agent.
 *
 * Endpoints implemented by K18Controller:
 *   GET    /api/delivery/sla/report  — SLA compliance report
 *   GET    /api/delivery/sla/breaches  — SLA breach list
 *   PUT    /api/delivery/sla/settings  — Set SLA targets
 */
@Injectable()
export class K18Service {
  constructor(
    @InjectRepository(K18Entity)
    private readonly repo: Repository<K18Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`K18 record ${id} not found`);
    return found;
  }

  create(dto: CreateK18Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateK18Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
