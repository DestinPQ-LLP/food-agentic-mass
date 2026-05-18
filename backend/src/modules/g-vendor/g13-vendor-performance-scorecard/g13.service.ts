import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { G13Entity } from './g13.entity';
import { CreateG13Dto } from './dto/create-g13.dto';
import { UpdateG13Dto } from './dto/update-g13.dto';

/**
 * G13 — Vendor Performance Scorecard
 *
 * Rates vendors on delivery reliability, quality complaints, and rate consistency.
 *
 * Endpoints implemented by G13Controller:
 *   GET    /api/vendors/performance/:vendorId  — Vendor performance score
 *   GET    /api/vendors/performance/ranking  — All vendors ranked
 *   POST   /api/vendors/performance/review  — Submit vendor review
 */
@Injectable()
export class G13Service {
  constructor(
    @InjectRepository(G13Entity)
    private readonly repo: Repository<G13Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`G13 record ${id} not found`);
    return found;
  }

  create(dto: CreateG13Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateG13Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
