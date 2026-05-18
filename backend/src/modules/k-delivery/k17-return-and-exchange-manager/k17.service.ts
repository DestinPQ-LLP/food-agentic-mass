import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { K17Entity } from './k17.entity';
import { CreateK17Dto } from './dto/create-k17.dto';
import { UpdateK17Dto } from './dto/update-k17.dto';

/**
 * K17 — Return & Exchange Manager
 *
 * Handles order returns at delivery, triggering refund or replacement workflows.
 *
 * Endpoints implemented by K17Controller:
 *   POST   /api/delivery/returns  — Create return request
 *   PUT    /api/delivery/returns/:id/approve  — Approve return
 *   GET    /api/delivery/returns  — List all returns
 */
@Injectable()
export class K17Service {
  constructor(
    @InjectRepository(K17Entity)
    private readonly repo: Repository<K17Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`K17 record ${id} not found`);
    return found;
  }

  create(dto: CreateK17Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateK17Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
