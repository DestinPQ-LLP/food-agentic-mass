import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { H10Entity } from './h10.entity';
import { CreateH10Dto } from './dto/create-h10.dto';
import { UpdateH10Dto } from './dto/update-h10.dto';

/**
 * H10 — Internal Staff Feedback
 *
 * Kitchen and counter staff submit internal quality observations (e.g., batter consistency, oil temperature).
 *
 * Endpoints implemented by H10Controller:
 *   POST   /api/quality/staff-feedback  — Submit staff quality observation
 *   GET    /api/quality/staff-feedback  — List staff feedback
 *   GET    /api/quality/staff-feedback/items  — Staff feedback by item
 */
@Injectable()
export class H10Service {
  constructor(
    @InjectRepository(H10Entity)
    private readonly repo: Repository<H10Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`H10 record ${id} not found`);
    return found;
  }

  create(dto: CreateH10Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateH10Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
