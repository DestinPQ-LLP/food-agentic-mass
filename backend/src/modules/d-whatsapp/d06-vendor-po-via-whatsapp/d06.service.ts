import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { D06Entity } from './d06.entity';
import { CreateD06Dto } from './dto/create-d06.dto';
import { UpdateD06Dto } from './dto/update-d06.dto';

/**
 * D06 — Vendor PO via WhatsApp
 *
 * Sends a formatted purchase order to the vendor's WhatsApp number directly from the system.
 *
 * Endpoints implemented by D06Controller:
 *   POST   /api/whatsapp/vendor-po/send  — Send PO to vendor
 *   GET    /api/whatsapp/vendor-po/template  — Get PO WhatsApp template
 *   GET    /api/whatsapp/vendor-po/history  — Send history
 */
@Injectable()
export class D06Service {
  constructor(
    @InjectRepository(D06Entity)
    private readonly repo: Repository<D06Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`D06 record ${id} not found`);
    return found;
  }

  create(dto: CreateD06Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateD06Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
