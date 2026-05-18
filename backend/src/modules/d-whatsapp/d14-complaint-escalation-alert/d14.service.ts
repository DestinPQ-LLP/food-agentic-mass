import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { D14Entity } from './d14.entity';
import { CreateD14Dto } from './dto/create-d14.dto';
import { UpdateD14Dto } from './dto/update-d14.dto';

/**
 * D14 — Complaint Escalation Alert
 *
 * Immediately notifies the owner via WhatsApp when a customer submits a 1- or 2-star rating.
 *
 * Endpoints implemented by D14Controller:
 *   POST   /api/whatsapp/escalation/send  — Send escalation alert
 *   PUT    /api/whatsapp/escalation/settings  — Set escalation threshold
 *   GET    /api/whatsapp/escalation/log  — Escalation history
 */
@Injectable()
export class D14Service {
  constructor(
    @InjectRepository(D14Entity)
    private readonly repo: Repository<D14Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`D14 record ${id} not found`);
    return found;
  }

  create(dto: CreateD14Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateD14Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
