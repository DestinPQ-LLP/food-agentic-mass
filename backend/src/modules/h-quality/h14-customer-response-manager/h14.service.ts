import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { H14Entity } from './h14.entity';
import { CreateH14Dto } from './dto/create-h14.dto';
import { UpdateH14Dto } from './dto/update-h14.dto';

/**
 * H14 — Customer Response Manager
 *
 * Allows manager to draft and send responses to customer feedback through the platform.
 *
 * Endpoints implemented by H14Controller:
 *   POST   /api/quality/feedback/:id/respond  — Respond to feedback
 *   GET    /api/quality/feedback/unresponded  — Feedback without response
 *   GET    /api/quality/feedback/:id/conversation  — Full conversation thread
 */
@Injectable()
export class H14Service {
  constructor(
    @InjectRepository(H14Entity)
    private readonly repo: Repository<H14Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`H14 record ${id} not found`);
    return found;
  }

  create(dto: CreateH14Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateH14Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
