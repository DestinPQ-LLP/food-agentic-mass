import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { M01Entity } from './m01.entity';
import { CreateM01Dto } from './dto/create-m01.dto';
import { UpdateM01Dto } from './dto/update-m01.dto';

/**
 * M01 — Owner Q&A Business Bot
 *
 * Natural language chatbot where owner asks business questions and gets data-backed answers.
 *
 * Endpoints implemented by M01Controller:
 *   POST   /api/ai/query  — Submit natural language business query
 *   GET    /api/ai/query/history  — Past queries and responses
 *   GET    /api/ai/query/suggestions  — Suggested questions
 */
@Injectable()
export class M01Service {
  constructor(
    @InjectRepository(M01Entity)
    private readonly repo: Repository<M01Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`M01 record ${id} not found`);
    return found;
  }

  create(dto: CreateM01Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateM01Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
