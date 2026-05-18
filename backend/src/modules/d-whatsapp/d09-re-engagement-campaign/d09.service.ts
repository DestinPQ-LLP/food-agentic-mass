import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { D09Entity } from './d09.entity';
import { CreateD09Dto } from './dto/create-d09.dto';
import { UpdateD09Dto } from './dto/update-d09.dto';

/**
 * D09 — Re-engagement Campaign
 *
 * Sends a win-back message to customers who haven't visited in a configurable number of days.
 *
 * Endpoints implemented by D09Controller:
 *   POST   /api/whatsapp/reengagement/send  — Launch re-engagement campaign
 *   PUT    /api/whatsapp/reengagement/settings  — Configure lapse days
 *   GET    /api/whatsapp/reengagement/results  — Campaign response metrics
 */
@Injectable()
export class D09Service {
  constructor(
    @InjectRepository(D09Entity)
    private readonly repo: Repository<D09Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`D09 record ${id} not found`);
    return found;
  }

  create(dto: CreateD09Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateD09Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
