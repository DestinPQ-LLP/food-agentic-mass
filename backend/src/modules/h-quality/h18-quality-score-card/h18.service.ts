import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { H18Entity } from './h18.entity';
import { CreateH18Dto } from './dto/create-h18.dto';
import { UpdateH18Dto } from './dto/update-h18.dto';

/**
 * H18 — Quality Score Card
 *
 * Single composite quality score combining ratings, complaints, escalations, and hygiene compliance.
 *
 * Endpoints implemented by H18Controller:
 *   GET    /api/quality/scorecard  — Current quality scorecard
 *   GET    /api/quality/scorecard/history  — Scorecard history
 *   GET    /api/quality/scorecard/components  — Score component breakdown
 */
@Injectable()
export class H18Service {
  constructor(
    @InjectRepository(H18Entity)
    private readonly repo: Repository<H18Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`H18 record ${id} not found`);
    return found;
  }

  create(dto: CreateH18Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateH18Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
