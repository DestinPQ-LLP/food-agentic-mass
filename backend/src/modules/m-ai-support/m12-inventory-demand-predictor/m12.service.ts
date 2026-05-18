import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { M12Entity } from './m12.entity';
import { CreateM12Dto } from './dto/create-m12.dto';
import { UpdateM12Dto } from './dto/update-m12.dto';

/**
 * M12 — Inventory Demand Predictor
 *
 * Predicts how much of each raw material to procure based on AI demand forecasting.
 *
 * Endpoints implemented by M12Controller:
 *   GET    /api/ai/inventory/forecast  — Inventory demand forecast
 *   GET    /api/ai/inventory/forecast/items  — Per-material forecast
 *   POST   /api/ai/inventory/forecast/generate-po  — Generate PO from forecast
 */
@Injectable()
export class M12Service {
  constructor(
    @InjectRepository(M12Entity)
    private readonly repo: Repository<M12Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`M12 record ${id} not found`);
    return found;
  }

  create(dto: CreateM12Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateM12Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
