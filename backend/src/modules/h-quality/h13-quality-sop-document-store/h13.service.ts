import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { H13Entity } from './h13.entity';
import { CreateH13Dto } from './dto/create-h13.dto';
import { UpdateH13Dto } from './dto/update-h13.dto';

/**
 * H13 — Quality SOP Document Store
 *
 * Upload and categorise Standard Operating Procedures accessible to all staff.
 *
 * Endpoints implemented by H13Controller:
 *   POST   /api/quality/sops  — Upload SOP document
 *   GET    /api/quality/sops  — List SOPs
 *   GET    /api/quality/sops/:id/download  — Download SOP
 */
@Injectable()
export class H13Service {
  constructor(
    @InjectRepository(H13Entity)
    private readonly repo: Repository<H13Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`H13 record ${id} not found`);
    return found;
  }

  create(dto: CreateH13Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateH13Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
