import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { D12Entity } from './d12.entity';
import { CreateD12Dto } from './dto/create-d12.dto';
import { UpdateD12Dto } from './dto/update-d12.dto';

/**
 * D12 — Birthday Wish Sender
 *
 * Sends automated birthday wishes with an optional discount coupon via WhatsApp.
 *
 * Endpoints implemented by D12Controller:
 *   POST   /api/whatsapp/birthday-wish/send  — Send birthday wishes today
 *   GET    /api/whatsapp/birthday-wish/template  — Template config
 *   PUT    /api/whatsapp/birthday-wish/offer  — Set birthday offer
 */
@Injectable()
export class D12Service {
  constructor(
    @InjectRepository(D12Entity)
    private readonly repo: Repository<D12Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`D12 record ${id} not found`);
    return found;
  }

  create(dto: CreateD12Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateD12Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
