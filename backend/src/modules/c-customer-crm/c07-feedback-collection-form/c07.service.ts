import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { C07Entity } from './c07.entity';
import { CreateC07Dto } from './dto/create-c07.dto';
import { UpdateC07Dto } from './dto/update-c07.dto';

/**
 * C07 — Feedback Collection Form
 *
 * Post-order feedback form (star rating + comments) accessible via QR code, link, or counter tablet.
 *
 * Endpoints implemented by C07Controller:
 *   POST   /api/crm/feedback  — Submit customer feedback
 *   GET    /api/crm/feedback/recent  — Recent feedback list
 *   GET    /api/crm/feedback/:orderId  — Feedback for a specific order
 */
@Injectable()
export class C07Service {
  constructor(
    @InjectRepository(C07Entity)
    private readonly repo: Repository<C07Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`C07 record ${id} not found`);
    return found;
  }

  create(dto: CreateC07Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateC07Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
