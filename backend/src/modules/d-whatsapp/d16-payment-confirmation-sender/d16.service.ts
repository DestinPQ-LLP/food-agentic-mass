import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { D16Entity } from './d16.entity';
import { CreateD16Dto } from './dto/create-d16.dto';
import { UpdateD16Dto } from './dto/update-d16.dto';

/**
 * D16 — Payment Confirmation Sender
 *
 * Sends a payment receipt via WhatsApp to the customer after successful payment.
 *
 * Endpoints implemented by D16Controller:
 *   POST   /api/whatsapp/payment-confirm/send  — Send payment confirmation
 *   GET    /api/whatsapp/payment-confirm/template  — Get template
 *   PUT    /api/whatsapp/payment-confirm/template  — Update template
 */
@Injectable()
export class D16Service {
  constructor(
    @InjectRepository(D16Entity)
    private readonly repo: Repository<D16Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`D16 record ${id} not found`);
    return found;
  }

  create(dto: CreateD16Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateD16Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
