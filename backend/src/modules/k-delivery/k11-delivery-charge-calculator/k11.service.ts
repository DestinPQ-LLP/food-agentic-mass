import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { K11Entity } from './k11.entity';
import { CreateK11Dto } from './dto/create-k11.dto';
import { UpdateK11Dto } from './dto/update-k11.dto';

/**
 * K11 — Delivery Charge Calculator
 *
 * Auto-calculates delivery fee based on zone, order amount, or distance.
 *
 * Endpoints implemented by K11Controller:
 *   POST   /api/delivery/charges/calculate  — Calculate delivery charge
 *   GET    /api/delivery/charges/rules  — Charge rules
 *   PUT    /api/delivery/charges/rules  — Update charge rules
 */
@Injectable()
export class K11Service {
  constructor(
    @InjectRepository(K11Entity)
    private readonly repo: Repository<K11Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`K11 record ${id} not found`);
    return found;
  }

  create(dto: CreateK11Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateK11Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
