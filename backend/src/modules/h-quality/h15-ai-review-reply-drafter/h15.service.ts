import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { H15Entity } from './h15.entity';
import { CreateH15Dto } from './dto/create-h15.dto';
import { UpdateH15Dto } from './dto/update-h15.dto';

/**
 * H15 — AI Review Reply Drafter
 *
 * Uses AI to draft a professional response to customer reviews for manager review and send.
 *
 * Endpoints implemented by H15Controller:
 *   POST   /api/quality/ai-reply/draft  — Draft AI review reply
 *   PUT    /api/quality/ai-reply/approve  — Approve and send draft
 *   GET    /api/quality/ai-reply/drafts  — Pending AI drafts
 */
@Injectable()
export class H15Service {
  constructor(
    @InjectRepository(H15Entity)
    private readonly repo: Repository<H15Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`H15 record ${id} not found`);
    return found;
  }

  create(dto: CreateH15Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateH15Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
