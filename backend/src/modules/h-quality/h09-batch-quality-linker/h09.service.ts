import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { H09Entity } from './h09.entity';
import { CreateH09Dto } from './dto/create-h09.dto';
import { UpdateH09Dto } from './dto/update-h09.dto';

/**
 * H09 — Batch Quality Linker
 *
 * Links production batches to quality issues so a bad batch can be traced immediately.
 *
 * Endpoints implemented by H09Controller:
 *   PUT    /api/quality/complaints/:id/batch  — Link complaint to batch
 *   GET    /api/kitchen/batches/:id/complaints  — Complaints for a batch
 *   GET    /api/quality/complaints/batches/high  — Batches with most complaints
 */
@Injectable()
export class H09Service {
  constructor(
    @InjectRepository(H09Entity)
    private readonly repo: Repository<H09Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`H09 record ${id} not found`);
    return found;
  }

  create(dto: CreateH09Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateH09Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
