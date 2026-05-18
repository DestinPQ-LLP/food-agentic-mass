import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { H06Entity } from './h06.entity';
import { CreateH06Dto } from './dto/create-h06.dto';
import { UpdateH06Dto } from './dto/update-h06.dto';

/**
 * H06 — Item Quality Complaint Log
 *
 * Staff or customers log quality issues against specific menu items.
 *
 * Endpoints implemented by H06Controller:
 *   POST   /api/quality/complaints  — Log a quality complaint
 *   GET    /api/quality/complaints  — List complaints
 *   GET    /api/quality/complaints/items  — Complaints by item
 */
@Injectable()
export class H06Service {
  constructor(
    @InjectRepository(H06Entity)
    private readonly repo: Repository<H06Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`H06 record ${id} not found`);
    return found;
  }

  create(dto: CreateH06Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateH06Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
