import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { N03Entity } from './n03.entity';
import { CreateN03Dto } from './dto/create-n03.dto';
import { UpdateN03Dto } from './dto/update-n03.dto';

/**
 * N03 — Centralized Menu Manager
 *
 * Manage the menu across all branches from one admin panel; push updates to all or select branches.
 *
 * Endpoints implemented by N03Controller:
 *   PUT    /api/branches/menu/publish  — Publish menu update to branches
 *   GET    /api/branches/menu/diff  — Show menu differences across branches
 *   POST   /api/branches/menu/sync  — Sync menu to selected branches
 */
@Injectable()
export class N03Service {
  constructor(
    @InjectRepository(N03Entity)
    private readonly repo: Repository<N03Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`N03 record ${id} not found`);
    return found;
  }

  create(dto: CreateN03Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateN03Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
