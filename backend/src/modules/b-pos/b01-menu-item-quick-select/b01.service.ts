import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { B01Entity } from './b01.entity';
import { CreateB01Dto } from './dto/create-b01.dto';
import { UpdateB01Dto } from './dto/update-b01.dto';

/**
 * B01 — Menu Item Quick Select
 *
 * Touch-optimised grid of menu items allowing cashiers to add items to an order in one tap.
 *
 * Endpoints implemented by B01Controller:
 *   GET    /api/pos/menu  — Active menu items grouped by category
 *   GET    /api/pos/menu/search  — Search menu items
 *   GET    /api/pos/menu/favourites  — Frequently ordered items
 */
@Injectable()
export class B01Service {
  constructor(
    @InjectRepository(B01Entity)
    private readonly repo: Repository<B01Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`B01 record ${id} not found`);
    return found;
  }

  create(dto: CreateB01Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateB01Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
