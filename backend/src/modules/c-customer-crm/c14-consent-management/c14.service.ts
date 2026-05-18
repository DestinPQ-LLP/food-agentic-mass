import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { C14Entity } from './c14.entity';
import { CreateC14Dto } from './dto/create-c14.dto';
import { UpdateC14Dto } from './dto/update-c14.dto';

/**
 * C14 — Consent Management
 *
 * Records customer consent for data collection, marketing, and optional biometric features.
 *
 * Endpoints implemented by C14Controller:
 *   POST   /api/crm/consent  — Record consent for a customer
 *   GET    /api/crm/consent/:customerId  — Get consent status
 *   DELETE /api/crm/consent/:customerId  — Withdraw customer consent
 */
@Injectable()
export class C14Service {
  constructor(
    @InjectRepository(C14Entity)
    private readonly repo: Repository<C14Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`C14 record ${id} not found`);
    return found;
  }

  create(dto: CreateC14Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateC14Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
