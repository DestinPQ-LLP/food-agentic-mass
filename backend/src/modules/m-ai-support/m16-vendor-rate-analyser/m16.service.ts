import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { M16Entity } from './m16.entity';
import { CreateM16Dto } from './dto/create-m16.dto';
import { UpdateM16Dto } from './dto/update-m16.dto';

/**
 * M16 — Vendor Rate Analyser
 *
 * AI compares vendor rates against market benchmarks and historical trends to flag overpricing.
 *
 * Endpoints implemented by M16Controller:
 *   GET    /api/ai/vendor-rates/analysis  — Rate analysis across vendors
 *   GET    /api/ai/vendor-rates/overprice  — Overpriced items by vendor
 *   GET    /api/ai/vendor-rates/benchmark  — Market benchmark rates
 */
@Injectable()
export class M16Service {
  constructor(
    @InjectRepository(M16Entity)
    private readonly repo: Repository<M16Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`M16 record ${id} not found`);
    return found;
  }

  create(dto: CreateM16Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateM16Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
