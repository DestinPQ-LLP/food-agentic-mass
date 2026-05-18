import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { M03Entity } from './m03.entity';
import { CreateM03Dto } from './dto/create-m03.dto';
import { UpdateM03Dto } from './dto/update-m03.dto';

/**
 * M03 — Wastage Prediction Model
 *
 * Predicts which items are likely to be wasted today based on prep history and demand forecast.
 *
 * Endpoints implemented by M03Controller:
 *   GET    /api/ai/wastage/prediction  — Wastage prediction for today
 *   GET    /api/ai/wastage/prediction/items  — Per-item wastage risk
 *   GET    /api/ai/wastage/prediction/history  — Prediction accuracy history
 */
@Injectable()
export class M03Service {
  constructor(
    @InjectRepository(M03Entity)
    private readonly repo: Repository<M03Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`M03 record ${id} not found`);
    return found;
  }

  create(dto: CreateM03Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateM03Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
