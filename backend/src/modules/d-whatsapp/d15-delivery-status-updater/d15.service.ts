import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { D15Entity } from './d15.entity';
import { CreateD15Dto } from './dto/create-d15.dto';
import { UpdateD15Dto } from './dto/update-d15.dto';

/**
 * D15 — Delivery Status Updater
 *
 * Sends real-time WhatsApp updates to customers at each delivery stage: dispatched, out-for-delivery, delivered.
 *
 * Endpoints implemented by D15Controller:
 *   POST   /api/whatsapp/delivery-update/send  — Send delivery status update
 *   GET    /api/whatsapp/delivery-update/templates  — Status update templates
 *   PUT    /api/whatsapp/delivery-update/templates/:stage  — Update stage template
 */
@Injectable()
export class D15Service {
  constructor(
    @InjectRepository(D15Entity)
    private readonly repo: Repository<D15Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`D15 record ${id} not found`);
    return found;
  }

  create(dto: CreateD15Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateD15Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
