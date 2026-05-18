import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { K09Entity } from './k09.entity';
import { CreateK09Dto } from './dto/create-k09.dto';
import { UpdateK09Dto } from './dto/update-k09.dto';

/**
 * K09 — Delivery Analytics Dashboard
 *
 * Metrics: on-time rate, average delivery time, agent performance, and zone-wise volume.
 *
 * Endpoints implemented by K09Controller:
 *   GET    /api/delivery/analytics  — Delivery analytics for period
 *   GET    /api/delivery/analytics/agents  — Agent performance analytics
 *   GET    /api/delivery/analytics/zones  — Zone-wise delivery analytics
 */
@Injectable()
export class K09Service {
  constructor(
    @InjectRepository(K09Entity)
    private readonly repo: Repository<K09Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`K09 record ${id} not found`);
    return found;
  }

  create(dto: CreateK09Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateK09Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
