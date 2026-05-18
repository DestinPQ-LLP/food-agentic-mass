import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { M08Entity } from './m08.entity';
import { CreateM08Dto } from './dto/create-m08.dto';
import { UpdateM08Dto } from './dto/update-m08.dto';

/**
 * M08 — AI-Generated Owner Summary
 *
 * Produces a daily plain-English narrative summary of business performance for the owner.
 *
 * Endpoints implemented by M08Controller:
 *   GET    /api/ai/summary/today  — AI narrative summary for today
 *   POST   /api/ai/summary/send  — Send summary to owner
 *   PUT    /api/ai/summary/settings  — Configure summary parameters
 */
@Injectable()
export class M08Service {
  constructor(
    @InjectRepository(M08Entity)
    private readonly repo: Repository<M08Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`M08 record ${id} not found`);
    return found;
  }

  create(dto: CreateM08Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateM08Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
