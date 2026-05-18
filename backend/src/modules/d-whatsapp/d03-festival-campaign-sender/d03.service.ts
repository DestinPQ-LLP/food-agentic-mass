import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { D03Entity } from './d03.entity';
import { CreateD03Dto } from './dto/create-d03.dto';
import { UpdateD03Dto } from './dto/update-d03.dto';

/**
 * D03 — Festival Campaign Sender
 *
 * Creates and schedules promotional campaigns tied to festivals, seasons, or custom events.
 *
 * Endpoints implemented by D03Controller:
 *   POST   /api/whatsapp/campaigns  — Create a campaign
 *   GET    /api/whatsapp/campaigns  — List campaigns
 *   POST   /api/whatsapp/campaigns/:id/launch  — Launch campaign
 */
@Injectable()
export class D03Service {
  constructor(
    @InjectRepository(D03Entity)
    private readonly repo: Repository<D03Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`D03 record ${id} not found`);
    return found;
  }

  create(dto: CreateD03Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateD03Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
