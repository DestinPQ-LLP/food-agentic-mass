import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { B09Entity } from './b09.entity';
import { CreateB09Dto } from './dto/create-b09.dto';
import { UpdateB09Dto } from './dto/update-b09.dto';

/**
 * B09 — Tax & GST Calculator
 *
 * Automatically computes GST and other applicable taxes per item based on configured tax slabs.
 *
 * Endpoints implemented by B09Controller:
 *   GET    /api/pos/tax/slabs  — List tax slabs
 *   POST   /api/pos/tax/calculate  — Calculate tax for an order
 *   PUT    /api/pos/tax/slabs/:id  — Update tax slab
 */
@Injectable()
export class B09Service {
  constructor(
    @InjectRepository(B09Entity)
    private readonly repo: Repository<B09Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`B09 record ${id} not found`);
    return found;
  }

  create(dto: CreateB09Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateB09Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
