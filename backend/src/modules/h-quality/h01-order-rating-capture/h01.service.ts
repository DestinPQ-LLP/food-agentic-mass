import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { H01Entity } from './h01.entity';
import { CreateH01Dto } from './dto/create-h01.dto';
import { UpdateH01Dto } from './dto/update-h01.dto';

/**
 * H01 — Order Rating Capture
 *
 * Customer submits a star rating (1–5) linked to their order, accessible via QR or tablet.
 *
 * Endpoints implemented by H01Controller:
 *   POST   /api/quality/ratings  — Submit order rating
 *   GET    /api/quality/ratings  — List ratings
 *   GET    /api/quality/ratings/average  — Average rating for period
 */
@Injectable()
export class H01Service {
  constructor(
    @InjectRepository(H01Entity)
    private readonly repo: Repository<H01Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`H01 record ${id} not found`);
    return found;
  }

  create(dto: CreateH01Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateH01Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
