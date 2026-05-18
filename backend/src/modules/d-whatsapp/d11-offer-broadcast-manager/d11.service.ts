import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { D11Entity } from './d11.entity';
import { CreateD11Dto } from './dto/create-d11.dto';
import { UpdateD11Dto } from './dto/update-d11.dto';

/**
 * D11 — Offer Broadcast Manager
 *
 * Sends promotional offers to customer segments with rich media (image + text + CTA).
 *
 * Endpoints implemented by D11Controller:
 *   POST   /api/whatsapp/offers/broadcast  — Broadcast an offer
 *   GET    /api/whatsapp/offers/broadcasts  — List past broadcasts
 *   GET    /api/whatsapp/offers/broadcasts/:id/stats  — Broadcast statistics
 */
@Injectable()
export class D11Service {
  constructor(
    @InjectRepository(D11Entity)
    private readonly repo: Repository<D11Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`D11 record ${id} not found`);
    return found;
  }

  create(dto: CreateD11Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateD11Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
