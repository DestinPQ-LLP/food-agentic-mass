import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { G10Entity } from './g10.entity';
import { CreateG10Dto } from './dto/create-g10.dto';
import { UpdateG10Dto } from './dto/update-g10.dto';

/**
 * G10 — Vendor Payment Tracker
 *
 * Records payments made to vendors and tracks outstanding balances.
 *
 * Endpoints implemented by G10Controller:
 *   POST   /api/vendors/payments  — Record vendor payment
 *   GET    /api/vendors/payments/:vendorId  — Payments by vendor
 *   GET    /api/vendors/payments/outstanding  — Outstanding payables
 */
@Injectable()
export class G10Service {
  constructor(
    @InjectRepository(G10Entity)
    private readonly repo: Repository<G10Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`G10 record ${id} not found`);
    return found;
  }

  create(dto: CreateG10Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateG10Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
