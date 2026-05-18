import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { I13Entity } from './i13.entity';
import { CreateI13Dto } from './dto/create-i13.dto';
import { UpdateI13Dto } from './dto/update-i13.dto';

/**
 * I13 — Onboarding Checklist
 *
 * Step-by-step onboarding checklist for new staff covering documents, training, and system access.
 *
 * Endpoints implemented by I13Controller:
 *   GET    /api/staff/onboarding/checklist  — Onboarding checklist template
 *   POST   /api/staff/onboarding/:staffId/progress  — Update onboarding progress
 *   GET    /api/staff/onboarding/:staffId/status  — Onboarding completion status
 */
@Injectable()
export class I13Service {
  constructor(
    @InjectRepository(I13Entity)
    private readonly repo: Repository<I13Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`I13 record ${id} not found`);
    return found;
  }

  create(dto: CreateI13Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateI13Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
