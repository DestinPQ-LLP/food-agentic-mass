import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { C08Entity } from './c08.entity';
import { CreateC08Dto } from './dto/create-c08.dto';
import { UpdateC08Dto } from './dto/update-c08.dto';

/**
 * C08 — Customer Birthday Alerts
 *
 * Stores customer birthday (optional) and triggers a WhatsApp wish or offer on the birthday.
 *
 * Endpoints implemented by C08Controller:
 *   PUT    /api/crm/customers/:id/birthday  — Save birthday
 *   GET    /api/crm/customers/birthdays/today  — Customers with birthday today
 *   POST   /api/crm/customers/birthdays/send-wishes  — Trigger birthday WhatsApp
 */
@Injectable()
export class C08Service {
  constructor(
    @InjectRepository(C08Entity)
    private readonly repo: Repository<C08Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`C08 record ${id} not found`);
    return found;
  }

  create(dto: CreateC08Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateC08Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
