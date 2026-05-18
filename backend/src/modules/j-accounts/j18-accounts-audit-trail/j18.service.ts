import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { J18Entity } from './j18.entity';
import { CreateJ18Dto } from './dto/create-j18.dto';
import { UpdateJ18Dto } from './dto/update-j18.dto';

/**
 * J18 — Accounts Audit Trail
 *
 * Immutable log of all financial record changes with user, timestamp, and before/after values.
 *
 * Endpoints implemented by J18Controller:
 *   GET    /api/accounts/audit  — Full accounts audit log
 *   GET    /api/accounts/audit/:entityType  — Audit log by entity type
 *   GET    /api/accounts/audit/user/:userId  — Audit log by user
 */
@Injectable()
export class J18Service {
  constructor(
    @InjectRepository(J18Entity)
    private readonly repo: Repository<J18Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`J18 record ${id} not found`);
    return found;
  }

  create(dto: CreateJ18Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateJ18Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
