import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { C13Entity } from './c13.entity';
import { CreateC13Dto } from './dto/create-c13.dto';
import { UpdateC13Dto } from './dto/update-c13.dto';

/**
 * C13 — Customer Data Export
 *
 * Exports the full customer list with profiles, segments, and LTV data to CSV or Excel.
 *
 * Endpoints implemented by C13Controller:
 *   GET    /api/crm/customers/export/csv  — Export customers as CSV
 *   GET    /api/crm/customers/export/excel  — Export customers as Excel
 *   POST   /api/crm/customers/export/filtered  — Export with applied filters
 */
@Injectable()
export class C13Service {
  constructor(
    @InjectRepository(C13Entity)
    private readonly repo: Repository<C13Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`C13 record ${id} not found`);
    return found;
  }

  create(dto: CreateC13Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateC13Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
