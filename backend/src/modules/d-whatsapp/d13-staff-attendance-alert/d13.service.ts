import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { D13Entity } from './d13.entity';
import { CreateD13Dto } from './dto/create-d13.dto';
import { UpdateD13Dto } from './dto/update-d13.dto';

/**
 * D13 — Staff Attendance Alert
 *
 * Alerts the manager via WhatsApp when a staff member is late or absent at shift start.
 *
 * Endpoints implemented by D13Controller:
 *   POST   /api/whatsapp/staff-alert/send  — Send attendance alert
 *   PUT    /api/whatsapp/staff-alert/settings  — Configure shift start times
 *   GET    /api/whatsapp/staff-alert/log  — Alert history
 */
@Injectable()
export class D13Service {
  constructor(
    @InjectRepository(D13Entity)
    private readonly repo: Repository<D13Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`D13 record ${id} not found`);
    return found;
  }

  create(dto: CreateD13Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateD13Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
