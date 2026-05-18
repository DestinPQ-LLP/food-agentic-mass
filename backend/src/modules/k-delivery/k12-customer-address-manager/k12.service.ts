import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { K12Entity } from './k12.entity';
import { CreateK12Dto } from './dto/create-k12.dto';
import { UpdateK12Dto } from './dto/update-k12.dto';

/**
 * K12 — Customer Address Manager
 *
 * Saves and manages customer delivery addresses linked to their mobile number.
 *
 * Endpoints implemented by K12Controller:
 *   POST   /api/delivery/addresses  — Save address for customer
 *   GET    /api/delivery/addresses/:customerId  — Customer addresses
 *   PUT    /api/delivery/addresses/:id/default  — Set default address
 */
@Injectable()
export class K12Service {
  constructor(
    @InjectRepository(K12Entity)
    private readonly repo: Repository<K12Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`K12 record ${id} not found`);
    return found;
  }

  create(dto: CreateK12Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateK12Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
