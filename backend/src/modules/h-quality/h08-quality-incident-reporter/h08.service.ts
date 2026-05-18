import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { H08Entity } from './h08.entity';
import { CreateH08Dto } from './dto/create-h08.dto';
import { UpdateH08Dto } from './dto/update-h08.dto';

/**
 * H08 — Quality Incident Reporter
 *
 * Formal incident reporting for serious quality issues: foreign objects, contamination, illness.
 *
 * Endpoints implemented by H08Controller:
 *   POST   /api/quality/incidents  — Create incident report
 *   GET    /api/quality/incidents  — List incidents
 *   PUT    /api/quality/incidents/:id/close  — Close incident with resolution
 */
@Injectable()
export class H08Service {
  constructor(
    @InjectRepository(H08Entity)
    private readonly repo: Repository<H08Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`H08 record ${id} not found`);
    return found;
  }

  create(dto: CreateH08Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateH08Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
