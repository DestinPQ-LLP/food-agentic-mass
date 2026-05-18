import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { H03Entity } from './h03.entity';
import { CreateH03Dto } from './dto/create-h03.dto';
import { UpdateH03Dto } from './dto/update-h03.dto';

/**
 * H03 — Poor Rating Escalation
 *
 * Auto-escalates orders with rating <= 2 stars to manager via WhatsApp and alert centre.
 *
 * Endpoints implemented by H03Controller:
 *   GET    /api/quality/escalations  — List escalated ratings
 *   PUT    /api/quality/escalations/:id/resolve  — Resolve escalation
 *   PUT    /api/quality/escalations/settings  — Set escalation threshold
 */
@Injectable()
export class H03Service {
  constructor(
    @InjectRepository(H03Entity)
    private readonly repo: Repository<H03Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`H03 record ${id} not found`);
    return found;
  }

  create(dto: CreateH03Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateH03Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
