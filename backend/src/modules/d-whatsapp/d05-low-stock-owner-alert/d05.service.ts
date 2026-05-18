import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { D05Entity } from './d05.entity';
import { CreateD05Dto } from './dto/create-d05.dto';
import { UpdateD05Dto } from './dto/update-d05.dto';

/**
 * D05 — Low Stock Owner Alert
 *
 * Sends a WhatsApp alert to the owner or manager when any inventory item drops below reorder level.
 *
 * Endpoints implemented by D05Controller:
 *   POST   /api/whatsapp/stock-alert/send  — Send low stock alert
 *   PUT    /api/whatsapp/stock-alert/settings  — Configure alert thresholds
 *   GET    /api/whatsapp/stock-alert/history  — Alert send history
 */
@Injectable()
export class D05Service {
  constructor(
    @InjectRepository(D05Entity)
    private readonly repo: Repository<D05Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`D05 record ${id} not found`);
    return found;
  }

  create(dto: CreateD05Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateD05Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
