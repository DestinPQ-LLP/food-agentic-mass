import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { G02Entity } from './g02.entity';
import { CreateG02Dto } from './dto/create-g02.dto';
import { UpdateG02Dto } from './dto/update-g02.dto';

/**
 * G02 — Material-Vendor Mapping
 *
 * Links each raw material to one or more vendors with preferred status.
 *
 * Endpoints implemented by G02Controller:
 *   POST   /api/vendors/mappings  — Create material-vendor mapping
 *   GET    /api/vendors/mappings/:materialId  — Vendors for a material
 *   PUT    /api/vendors/mappings/:id/preferred  — Set preferred vendor
 */
@Injectable()
export class G02Service {
  constructor(
    @InjectRepository(G02Entity)
    private readonly repo: Repository<G02Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`G02 record ${id} not found`);
    return found;
  }

  create(dto: CreateG02Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateG02Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
