import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { K13Entity } from './k13.entity';
import { CreateK13Dto } from './dto/create-k13.dto';
import { UpdateK13Dto } from './dto/update-k13.dto';

/**
 * K13 — Parcel Packaging Tracker
 *
 * Logs which packaging was used per delivery order to track packaging consumption.
 *
 * Endpoints implemented by K13Controller:
 *   POST   /api/delivery/packaging/log  — Log packaging used
 *   GET    /api/delivery/packaging/consumption  — Packaging consumption by period
 *   GET    /api/delivery/packaging/stock  — Current packaging stock
 */
@Injectable()
export class K13Service {
  constructor(
    @InjectRepository(K13Entity)
    private readonly repo: Repository<K13Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`K13 record ${id} not found`);
    return found;
  }

  create(dto: CreateK13Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateK13Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
