import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { N16Entity } from './n16.entity';
import { CreateN16Dto } from './dto/create-n16.dto';
import { UpdateN16Dto } from './dto/update-n16.dto';

/**
 * N16 — Central Kitchen Management
 *
 * Manages a central production facility that supplies prepared items to multiple outlets.
 *
 * Endpoints implemented by N16Controller:
 *   POST   /api/branches/central-kitchen/production  — Log central kitchen production
 *   GET    /api/branches/central-kitchen/dispatch  — Items dispatched to branches
 *   GET    /api/branches/central-kitchen/orders  — Branch supply orders for central kitchen
 */
@Injectable()
export class N16Service {
  constructor(
    @InjectRepository(N16Entity)
    private readonly repo: Repository<N16Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`N16 record ${id} not found`);
    return found;
  }

  create(dto: CreateN16Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateN16Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
