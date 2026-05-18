import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { B06Entity } from './b06.entity';
import { CreateB06Dto } from './dto/create-b06.dto';
import { UpdateB06Dto } from './dto/update-b06.dto';

/**
 * B06 — Bill/Receipt Printer
 *
 * Generates a formatted bill with itemised list, taxes, total, and payment mode for printing.
 *
 * Endpoints implemented by B06Controller:
 *   GET    /api/pos/bills/:orderId  — Generate bill HTML/PDF
 *   POST   /api/pos/bills/:orderId/print  — Trigger printer
 *   GET    /api/pos/bills/:orderId/resend  — Resend bill to customer WhatsApp
 */
@Injectable()
export class B06Service {
  constructor(
    @InjectRepository(B06Entity)
    private readonly repo: Repository<B06Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`B06 record ${id} not found`);
    return found;
  }

  create(dto: CreateB06Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateB06Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
