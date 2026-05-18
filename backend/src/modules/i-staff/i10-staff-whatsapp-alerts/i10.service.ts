import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { I10Entity } from './i10.entity';
import { CreateI10Dto } from './dto/create-i10.dto';
import { UpdateI10Dto } from './dto/update-i10.dto';

/**
 * I10 — Staff WhatsApp Alerts
 *
 * Sends WhatsApp messages to staff: shift reminders, task assignments, and attendance alerts.
 *
 * Endpoints implemented by I10Controller:
 *   POST   /api/staff/whatsapp/send  — Send WhatsApp to staff
 *   GET    /api/staff/whatsapp/templates  — Message templates
 *   GET    /api/staff/whatsapp/log  — Send history
 */
@Injectable()
export class I10Service {
  constructor(
    @InjectRepository(I10Entity)
    private readonly repo: Repository<I10Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`I10 record ${id} not found`);
    return found;
  }

  create(dto: CreateI10Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateI10Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
