import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { G18Entity } from './g18.entity';
import { CreateG18Dto } from './dto/create-g18.dto';
import { UpdateG18Dto } from './dto/update-g18.dto';

/**
 * G18 — Vendor Analytics Dashboard
 *
 * Aggregated view of procurement spend, delivery performance, and rate trends across all vendors.
 *
 * Endpoints implemented by G18Controller:
 *   GET    /api/vendors/analytics  — Full vendor analytics
 *   GET    /api/vendors/analytics/spend  — Spend analytics
 *   GET    /api/vendors/analytics/performance  — Performance analytics
 */
@Injectable()
export class G18Service {
  constructor(
    @InjectRepository(G18Entity)
    private readonly repo: Repository<G18Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`G18 record ${id} not found`);
    return found;
  }

  create(dto: CreateG18Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateG18Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
