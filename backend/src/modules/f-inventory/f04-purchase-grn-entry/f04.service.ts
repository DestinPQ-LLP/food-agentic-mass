import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { F04Entity } from './f04.entity';
import { CreateF04Dto } from './dto/create-f04.dto';
import { UpdateF04Dto } from './dto/update-f04.dto';

/**
 * F04 — Purchase/GRN Entry
 *
 * Records goods received from vendors: item, quantity, rate, and vendor reference.
 *
 * Endpoints implemented by F04Controller:
 *   POST   /api/inventory/purchases  — Log a purchase/GRN
 *   GET    /api/inventory/purchases  — List purchases
 *   GET    /api/inventory/purchases/:id  — Purchase detail
 */
@Injectable()
export class F04Service {
  constructor(
    @InjectRepository(F04Entity)
    private readonly repo: Repository<F04Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`F04 record ${id} not found`);
    return found;
  }

  create(dto: CreateF04Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateF04Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
