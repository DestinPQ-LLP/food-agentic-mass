import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { N07Entity } from './n07.entity';
import { CreateN07Dto } from './dto/create-n07.dto';
import { UpdateN07Dto } from './dto/update-n07.dto';

/**
 * N07 — Centralized Customer CRM
 *
 * Unified customer database visible across all branches; recognises customer at any outlet.
 *
 * Endpoints implemented by N07Controller:
 *   GET    /api/branches/crm/customers  — Global customer database
 *   GET    /api/branches/crm/customers/:id/all-branches  — Customer activity across branches
 *   PUT    /api/branches/crm/settings  — CRM sharing settings
 */
@Injectable()
export class N07Service {
  constructor(
    @InjectRepository(N07Entity)
    private readonly repo: Repository<N07Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`N07 record ${id} not found`);
    return found;
  }

  create(dto: CreateN07Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateN07Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
