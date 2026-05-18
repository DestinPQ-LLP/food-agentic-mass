import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { G17Entity } from './g17.entity';
import { CreateG17Dto } from './dto/create-g17.dto';
import { UpdateG17Dto } from './dto/update-g17.dto';

/**
 * G17 — Payment Due Alert
 *
 * Sends WhatsApp reminders to procurement staff when vendor payment is due.
 *
 * Endpoints implemented by G17Controller:
 *   GET    /api/vendors/payments/due-soon  — Payments due within N days
 *   POST   /api/vendors/payments/due-soon/remind  — Send payment reminder
 *   PUT    /api/vendors/payments/due-alert/settings  — Configure alert days ahead
 */
@Injectable()
export class G17Service {
  constructor(
    @InjectRepository(G17Entity)
    private readonly repo: Repository<G17Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`G17 record ${id} not found`);
    return found;
  }

  create(dto: CreateG17Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateG17Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
