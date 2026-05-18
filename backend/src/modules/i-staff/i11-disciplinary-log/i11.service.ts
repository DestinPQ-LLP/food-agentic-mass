import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { I11Entity } from './i11.entity';
import { CreateI11Dto } from './dto/create-i11.dto';
import { UpdateI11Dto } from './dto/update-i11.dto';

/**
 * I11 — Disciplinary Log
 *
 * Records warnings, incidents, and disciplinary actions linked to staff profiles.
 *
 * Endpoints implemented by I11Controller:
 *   POST   /api/staff/disciplinary  — Log disciplinary action
 *   GET    /api/staff/disciplinary/:staffId  — Disciplinary records for staff
 *   GET    /api/staff/disciplinary/recent  — Recent disciplinary actions
 */
@Injectable()
export class I11Service {
  constructor(
    @InjectRepository(I11Entity)
    private readonly repo: Repository<I11Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`I11 record ${id} not found`);
    return found;
  }

  create(dto: CreateI11Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateI11Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
