import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { G07Entity } from './g07.entity';
import { CreateG07Dto } from './dto/create-g07.dto';
import { UpdateG07Dto } from './dto/update-g07.dto';

/**
 * G07 — WhatsApp PO Dispatcher
 *
 * Sends the PO as a formatted WhatsApp message or PDF link to the vendor.
 *
 * Endpoints implemented by G07Controller:
 *   POST   /api/vendors/purchase-orders/:id/send-whatsapp  — Send PO via WhatsApp
 *   GET    /api/vendors/purchase-orders/:id/send-status  — WhatsApp send status
 *   GET    /api/vendors/purchase-orders/sent  — List sent POs
 */
@Injectable()
export class G07Service {
  constructor(
    @InjectRepository(G07Entity)
    private readonly repo: Repository<G07Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`G07 record ${id} not found`);
    return found;
  }

  create(dto: CreateG07Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateG07Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
