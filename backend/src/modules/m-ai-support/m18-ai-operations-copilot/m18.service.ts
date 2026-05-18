import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { M18Entity } from './m18.entity';
import { CreateM18Dto } from './dto/create-m18.dto';
import { UpdateM18Dto } from './dto/update-m18.dto';

/**
 * M18 — AI Operations Copilot
 *
 * Unified AI assistant that helps staff with operational decisions across all modules.
 *
 * Endpoints implemented by M18Controller:
 *   POST   /api/ai/copilot/ask  — Ask the operations copilot
 *   GET    /api/ai/copilot/suggestions  — Proactive suggestions from copilot
 *   GET    /api/ai/copilot/history  — Copilot conversation history
 */
@Injectable()
export class M18Service {
  constructor(
    @InjectRepository(M18Entity)
    private readonly repo: Repository<M18Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`M18 record ${id} not found`);
    return found;
  }

  create(dto: CreateM18Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateM18Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
