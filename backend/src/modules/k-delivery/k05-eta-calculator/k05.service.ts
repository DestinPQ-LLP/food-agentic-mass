import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { K05Entity } from './k05.entity';
import { CreateK05Dto } from './dto/create-k05.dto';
import { UpdateK05Dto } from './dto/update-k05.dto';

/**
 * K05 — ETA Calculator
 *
 * Estimates delivery time based on distance, kitchen prep time, and agent availability.
 *
 * Endpoints implemented by K05Controller:
 *   POST   /api/delivery/eta/calculate  — Calculate ETA for order
 *   GET    /api/delivery/eta/settings  — ETA configuration
 *   PUT    /api/delivery/eta/settings  — Update ETA parameters
 */
@Injectable()
export class K05Service {
  constructor(
    @InjectRepository(K05Entity)
    private readonly repo: Repository<K05Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`K05 record ${id} not found`);
    return found;
  }

  create(dto: CreateK05Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateK05Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
