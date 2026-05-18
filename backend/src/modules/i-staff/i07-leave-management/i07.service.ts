import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { I07Entity } from './i07.entity';
import { CreateI07Dto } from './dto/create-i07.dto';
import { UpdateI07Dto } from './dto/update-i07.dto';

/**
 * I07 — Leave Management
 *
 * Staff requests leave; manager approves or rejects; leave balance is tracked.
 *
 * Endpoints implemented by I07Controller:
 *   POST   /api/staff/leave/request  — Request leave
 *   PUT    /api/staff/leave/:id/approve  — Approve leave
 *   GET    /api/staff/leave/balance/:staffId  — Leave balance
 */
@Injectable()
export class I07Service {
  constructor(
    @InjectRepository(I07Entity)
    private readonly repo: Repository<I07Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`I07 record ${id} not found`);
    return found;
  }

  create(dto: CreateI07Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateI07Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
