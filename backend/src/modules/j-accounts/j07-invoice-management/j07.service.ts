import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { J07Entity } from './j07.entity';
import { CreateJ07Dto } from './dto/create-j07.dto';
import { UpdateJ07Dto } from './dto/update-j07.dto';

/**
 * J07 — Invoice Management
 *
 * Creates, manages, and archives sales invoices and vendor invoices.
 *
 * Endpoints implemented by J07Controller:
 *   POST   /api/accounts/invoices  — Create invoice
 *   GET    /api/accounts/invoices  — List invoices
 *   GET    /api/accounts/invoices/:id/pdf  — Download invoice PDF
 */
@Injectable()
export class J07Service {
  constructor(
    @InjectRepository(J07Entity)
    private readonly repo: Repository<J07Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`J07 record ${id} not found`);
    return found;
  }

  create(dto: CreateJ07Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateJ07Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
