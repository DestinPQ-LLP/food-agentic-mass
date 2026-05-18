import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { L18Entity } from './l18.entity';
import { CreateL18Dto } from './dto/create-l18.dto';
import { UpdateL18Dto } from './dto/update-l18.dto';

/**
 * L18 — Privacy Compliance Checker
 *
 * Validates CCTV deployment against a configurable privacy checklist (signage, retention, consent).
 *
 * Endpoints implemented by L18Controller:
 *   GET    /api/cctv/privacy/checklist  — Privacy compliance checklist
 *   POST   /api/cctv/privacy/checklist/submit  — Submit compliance answers
 *   GET    /api/cctv/privacy/status  — Current compliance status
 */
@Injectable()
export class L18Service {
  constructor(
    @InjectRepository(L18Entity)
    private readonly repo: Repository<L18Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`L18 record ${id} not found`);
    return found;
  }

  create(dto: CreateL18Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateL18Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
