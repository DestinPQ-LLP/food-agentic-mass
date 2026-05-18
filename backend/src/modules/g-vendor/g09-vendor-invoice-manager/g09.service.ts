import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { G09Entity } from './g09.entity';
import { CreateG09Dto } from './dto/create-g09.dto';
import { UpdateG09Dto } from './dto/update-g09.dto';

/**
 * G09 — Vendor Invoice Manager
 *
 * Stores and tracks vendor invoices linked to GRNs for payment processing.
 *
 * Endpoints implemented by G09Controller:
 *   POST   /api/vendors/invoices  — Upload vendor invoice
 *   GET    /api/vendors/invoices  — List invoices
 *   PUT    /api/vendors/invoices/:id/status  — Update invoice payment status
 */
@Injectable()
export class G09Service {
  constructor(
    @InjectRepository(G09Entity)
    private readonly repo: Repository<G09Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`G09 record ${id} not found`);
    return found;
  }

  create(dto: CreateG09Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateG09Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
