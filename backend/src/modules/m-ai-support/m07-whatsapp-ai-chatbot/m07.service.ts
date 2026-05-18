import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { M07Entity } from './m07.entity';
import { CreateM07Dto } from './dto/create-m07.dto';
import { UpdateM07Dto } from './dto/update-m07.dto';

/**
 * M07 — WhatsApp AI Chatbot
 *
 * Conversational AI that handles customer queries, order status, and menu questions on WhatsApp.
 *
 * Endpoints implemented by M07Controller:
 *   POST   /api/ai/chatbot/webhook  — Receive WhatsApp chatbot message
 *   GET    /api/ai/chatbot/sessions  — Active chatbot sessions
 *   PUT    /api/ai/chatbot/knowledge  — Update chatbot knowledge base
 */
@Injectable()
export class M07Service {
  constructor(
    @InjectRepository(M07Entity)
    private readonly repo: Repository<M07Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`M07 record ${id} not found`);
    return found;
  }

  create(dto: CreateM07Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateM07Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
