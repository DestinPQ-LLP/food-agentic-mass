import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { N02Entity } from './n02.entity';
import { CreateN02Dto } from './dto/create-n02.dto';
import { UpdateN02Dto } from './dto/update-n02.dto';

/**
 * N02 — Outlet Configuration Manager
 *
 * Create and configure new outlets with address, operating hours, and local server settings.
 *
 * Endpoints implemented by N02Controller:
 *   POST   /api/branches  — Create new branch/outlet
 *   GET    /api/branches  — List all branches
 *   PUT    /api/branches/:id  — Update branch configuration
 */
@Injectable()
export class N02Service {
  constructor(
    @InjectRepository(N02Entity)
    private readonly repo: Repository<N02Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`N02 record ${id} not found`);
    return found;
  }

  create(dto: CreateN02Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateN02Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
