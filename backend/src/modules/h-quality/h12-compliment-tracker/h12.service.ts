import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { H12Entity } from './h12.entity';
import { CreateH12Dto } from './dto/create-h12.dto';
import { UpdateH12Dto } from './dto/update-h12.dto';

/**
 * H12 — Compliment Tracker
 *
 * Logs positive customer compliments to balance the complaint picture and recognise staff.
 *
 * Endpoints implemented by H12Controller:
 *   POST   /api/quality/compliments  — Log compliment
 *   GET    /api/quality/compliments  — List compliments
 *   GET    /api/quality/compliments/staff  — Compliments by staff
 */
@Injectable()
export class H12Service {
  constructor(
    @InjectRepository(H12Entity)
    private readonly repo: Repository<H12Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`H12 record ${id} not found`);
    return found;
  }

  create(dto: CreateH12Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateH12Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
