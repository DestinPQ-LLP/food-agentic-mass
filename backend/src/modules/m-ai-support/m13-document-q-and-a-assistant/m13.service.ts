import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { M13Entity } from './m13.entity';
import { CreateM13Dto } from './dto/create-m13.dto';
import { UpdateM13Dto } from './dto/update-m13.dto';

/**
 * M13 — Document Q&A Assistant
 *
 * Allows staff to ask questions about uploaded SOPs, BRDs, and policies in natural language.
 *
 * Endpoints implemented by M13Controller:
 *   POST   /api/ai/docs/query  — Query uploaded documents
 *   POST   /api/ai/docs/upload  — Upload document to knowledge base
 *   GET    /api/ai/docs/list  — List indexed documents
 */
@Injectable()
export class M13Service {
  constructor(
    @InjectRepository(M13Entity)
    private readonly repo: Repository<M13Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`M13 record ${id} not found`);
    return found;
  }

  create(dto: CreateM13Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateM13Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
