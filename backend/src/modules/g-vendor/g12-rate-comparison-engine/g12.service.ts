import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { G12Entity } from './g12.entity';
import { CreateG12Dto } from './dto/create-g12.dto';
import { UpdateG12Dto } from './dto/update-g12.dto';

/**
 * G12 — Rate Comparison Engine
 *
 * Compares current vendor rates for the same material across vendors.
 *
 * Endpoints implemented by G12Controller:
 *   GET    /api/vendors/rates/compare/:materialId  — Compare rates for a material
 *   GET    /api/vendors/rates/savings  — Potential savings from switching
 *   GET    /api/vendors/rates/lowest  — Lowest-rate vendor per material
 */
@Injectable()
export class G12Service {
  constructor(
    @InjectRepository(G12Entity)
    private readonly repo: Repository<G12Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`G12 record ${id} not found`);
    return found;
  }

  create(dto: CreateG12Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateG12Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
