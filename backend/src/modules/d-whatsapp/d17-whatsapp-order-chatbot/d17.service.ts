import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { D17Entity } from './d17.entity';
import { CreateD17Dto } from './dto/create-d17.dto';
import { UpdateD17Dto } from './dto/update-d17.dto';

/**
 * D17 — WhatsApp Order Chatbot
 *
 * Accepts customer orders via WhatsApp conversation using a guided menu-selection flow.
 *
 * Endpoints implemented by D17Controller:
 *   POST   /api/whatsapp/chatbot/webhook  — WhatsApp webhook receiver
 *   GET    /api/whatsapp/chatbot/sessions  — Active chatbot sessions
 *   PUT    /api/whatsapp/chatbot/menu  — Update chatbot menu
 */
@Injectable()
export class D17Service {
  constructor(
    @InjectRepository(D17Entity)
    private readonly repo: Repository<D17Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`D17 record ${id} not found`);
    return found;
  }

  create(dto: CreateD17Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateD17Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
