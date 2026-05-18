import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { M04Entity } from './m04.entity';
import { CreateM04Dto } from './dto/create-m04.dto';
import { UpdateM04Dto } from './dto/update-m04.dto';

/**
 * M04 — Product Recommendation AI
 *
 * Suggests upsell or add-on items to cashier during order creation based on order context.
 *
 * Endpoints implemented by M04Controller:
 *   POST   /api/ai/recommendations/upsell  — Get upsell suggestions for order
 *   GET    /api/ai/recommendations/popular  — Popular item pairings
 *   PUT    /api/ai/recommendations/settings  — Configure recommendation rules
 */
@Injectable()
export class M04Service {
  constructor(
    @InjectRepository(M04Entity)
    private readonly repo: Repository<M04Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`M04 record ${id} not found`);
    return found;
  }

  create(dto: CreateM04Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateM04Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
