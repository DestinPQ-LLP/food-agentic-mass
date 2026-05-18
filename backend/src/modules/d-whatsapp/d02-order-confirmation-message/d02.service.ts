import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { D02Entity } from './d02.entity';
import { CreateD02Dto } from './dto/create-d02.dto';
import { UpdateD02Dto } from './dto/update-d02.dto';

/**
 * D02 — Order Confirmation Message
 *
 * Sends a WhatsApp confirmation to the customer after order is placed, showing items and total.
 *
 * Endpoints implemented by D02Controller:
 *   POST   /api/whatsapp/order-confirmation/send  — Send order confirmation
 *   GET    /api/whatsapp/order-confirmation/template  — Get template
 *   PUT    /api/whatsapp/order-confirmation/template  — Update template
 */
@Injectable()
export class D02Service {
  constructor(
    @InjectRepository(D02Entity)
    private readonly repo: Repository<D02Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`D02 record ${id} not found`);
    return found;
  }

  create(dto: CreateD02Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateD02Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
