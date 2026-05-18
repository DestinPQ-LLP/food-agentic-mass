import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { J12Entity } from './j12.entity';
import { CreateJ12Dto } from './dto/create-j12.dto';
import { UpdateJ12Dto } from './dto/update-j12.dto';

/**
 * J12 — Tally/Accounting Export
 *
 * Exports transactions in a format compatible with Tally or other accounting software.
 *
 * Endpoints implemented by J12Controller:
 *   GET    /api/accounts/export/tally  — Export Tally-format XML
 *   GET    /api/accounts/export/csv  — Export transactions as CSV
 *   PUT    /api/accounts/export/settings  — Configure export mapping
 */
@Injectable()
export class J12Service {
  constructor(
    @InjectRepository(J12Entity)
    private readonly repo: Repository<J12Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`J12 record ${id} not found`);
    return found;
  }

  create(dto: CreateJ12Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateJ12Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
