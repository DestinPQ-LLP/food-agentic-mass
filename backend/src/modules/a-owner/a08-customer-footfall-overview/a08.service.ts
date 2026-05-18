import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { A08Entity } from './a08.entity';
import { CreateA08Dto } from './dto/create-a08.dto';
import { UpdateA08Dto } from './dto/update-a08.dto';

/**
 * A08 — Customer Footfall Overview
 *
 * Tracks estimated customer count per hour and day using manual entry or camera-based count.
 *
 * Endpoints implemented by A08Controller:
 *   GET    /api/owner/footfall  — Footfall by date range
 *   GET    /api/owner/footfall/hourly  — Hourly footfall today
 *   POST   /api/owner/footfall/manual  — Submit manual count
 */
@Injectable()
export class A08Service {
  constructor(
    @InjectRepository(A08Entity)
    private readonly repo: Repository<A08Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`A08 record ${id} not found`);
    return found;
  }

  create(dto: CreateA08Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateA08Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
