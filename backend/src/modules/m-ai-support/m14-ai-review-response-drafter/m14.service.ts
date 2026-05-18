import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { M14Entity } from './m14.entity';
import { CreateM14Dto } from './dto/create-m14.dto';
import { UpdateM14Dto } from './dto/update-m14.dto';

/**
 * M14 — AI Review Response Drafter
 *
 * Generates professional responses to customer reviews for manager approval before sending.
 *
 * Endpoints implemented by M14Controller:
 *   POST   /api/ai/review-reply/draft  — Draft review reply
 *   GET    /api/ai/review-reply/pending  — Pending drafts for approval
 *   PUT    /api/ai/review-reply/:id/approve  — Approve and send draft
 */
@Injectable()
export class M14Service {
  constructor(
    @InjectRepository(M14Entity)
    private readonly repo: Repository<M14Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`M14 record ${id} not found`);
    return found;
  }

  create(dto: CreateM14Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateM14Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
