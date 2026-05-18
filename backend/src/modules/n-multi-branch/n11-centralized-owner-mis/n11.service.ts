import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { N11Entity } from './n11.entity';
import { CreateN11Dto } from './dto/create-n11.dto';
import { UpdateN11Dto } from './dto/update-n11.dto';

/**
 * N11 — Centralized Owner MIS
 *
 * Single WhatsApp MIS combining KPIs from all outlets for the owner.
 *
 * Endpoints implemented by N11Controller:
 *   GET    /api/branches/mis/consolidated  — Consolidated MIS data
 *   POST   /api/branches/mis/send  — Send consolidated MIS
 *   PUT    /api/branches/mis/schedule  — Schedule consolidated MIS
 */
@Injectable()
export class N11Service {
  constructor(
    @InjectRepository(N11Entity)
    private readonly repo: Repository<N11Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`N11 record ${id} not found`);
    return found;
  }

  create(dto: CreateN11Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateN11Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
