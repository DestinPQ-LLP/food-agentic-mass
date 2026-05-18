import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { G03Entity } from './g03.entity';
import { CreateG03Dto } from './dto/create-g03.dto';
import { UpdateG03Dto } from './dto/update-g03.dto';

/**
 * G03 — Rate History Tracker
 *
 * Records the price per unit for each material from each vendor over time.
 *
 * Endpoints implemented by G03Controller:
 *   POST   /api/vendors/rates  — Log a vendor rate
 *   GET    /api/vendors/rates/:vendorId/:materialId  — Rate history
 *   GET    /api/vendors/rates/compare  — Compare rates across vendors
 */
@Injectable()
export class G03Service {
  constructor(
    @InjectRepository(G03Entity)
    private readonly repo: Repository<G03Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`G03 record ${id} not found`);
    return found;
  }

  create(dto: CreateG03Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateG03Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
