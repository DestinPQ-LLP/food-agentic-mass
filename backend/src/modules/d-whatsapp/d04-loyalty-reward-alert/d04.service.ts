import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { D04Entity } from './d04.entity';
import { CreateD04Dto } from './dto/create-d04.dto';
import { UpdateD04Dto } from './dto/update-d04.dto';

/**
 * D04 — Loyalty Reward Alert
 *
 * Notifies customers when they earn points or when they are close to a reward milestone.
 *
 * Endpoints implemented by D04Controller:
 *   POST   /api/whatsapp/loyalty-alert/send  — Send loyalty alert
 *   GET    /api/whatsapp/loyalty-alert/template  — Get template
 *   PUT    /api/whatsapp/loyalty-alert/rules  — Set alert trigger rules
 */
@Injectable()
export class D04Service {
  constructor(
    @InjectRepository(D04Entity)
    private readonly repo: Repository<D04Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`D04 record ${id} not found`);
    return found;
  }

  create(dto: CreateD04Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateD04Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
