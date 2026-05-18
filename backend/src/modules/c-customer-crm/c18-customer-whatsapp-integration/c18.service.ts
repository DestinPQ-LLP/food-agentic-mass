import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { C18Entity } from './c18.entity';
import { CreateC18Dto } from './dto/create-c18.dto';
import { UpdateC18Dto } from './dto/update-c18.dto';

/**
 * C18 — Customer WhatsApp Integration
 *
 * Send individual or bulk WhatsApp messages to customers from within the CRM.
 *
 * Endpoints implemented by C18Controller:
 *   POST   /api/crm/whatsapp/send  — Send WhatsApp message to customer
 *   GET    /api/crm/whatsapp/templates  — List message templates
 *   GET    /api/crm/whatsapp/history/:customerId  — Message history for customer
 */
@Injectable()
export class C18Service {
  constructor(
    @InjectRepository(C18Entity)
    private readonly repo: Repository<C18Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`C18 record ${id} not found`);
    return found;
  }

  create(dto: CreateC18Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateC18Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
