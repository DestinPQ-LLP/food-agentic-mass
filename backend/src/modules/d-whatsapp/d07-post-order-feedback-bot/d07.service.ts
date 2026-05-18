import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { D07Entity } from './d07.entity';
import { CreateD07Dto } from './dto/create-d07.dto';
import { UpdateD07Dto } from './dto/update-d07.dto';

/**
 * D07 — Post-Order Feedback Bot
 *
 * Sends a WhatsApp feedback request to the customer a configurable time after order completion.
 *
 * Endpoints implemented by D07Controller:
 *   POST   /api/whatsapp/feedback-request/send  — Send feedback request
 *   PUT    /api/whatsapp/feedback-request/delay  — Set delay after order
 *   GET    /api/whatsapp/feedback-request/responses  — List responses received
 */
@Injectable()
export class D07Service {
  constructor(
    @InjectRepository(D07Entity)
    private readonly repo: Repository<D07Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`D07 record ${id} not found`);
    return found;
  }

  create(dto: CreateD07Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateD07Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
