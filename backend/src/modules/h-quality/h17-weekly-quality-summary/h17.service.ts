import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { H17Entity } from './h17.entity';
import { CreateH17Dto } from './dto/create-h17.dto';
import { UpdateH17Dto } from './dto/update-h17.dto';

/**
 * H17 — Weekly Quality Summary
 *
 * Auto-generated weekly report of ratings, complaints, compliments, and checklist compliance.
 *
 * Endpoints implemented by H17Controller:
 *   GET    /api/quality/summary/weekly  — Weekly quality summary
 *   POST   /api/quality/summary/weekly/send  — Send summary to owner
 *   GET    /api/quality/summary/weekly/history  — Past weekly summaries
 */
@Injectable()
export class H17Service {
  constructor(
    @InjectRepository(H17Entity)
    private readonly repo: Repository<H17Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`H17 record ${id} not found`);
    return found;
  }

  create(dto: CreateH17Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateH17Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
