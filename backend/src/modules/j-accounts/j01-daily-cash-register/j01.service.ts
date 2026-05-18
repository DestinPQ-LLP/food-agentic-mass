import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { J01Entity } from './j01.entity';
import { CreateJ01Dto } from './dto/create-j01.dto';
import { UpdateJ01Dto } from './dto/update-j01.dto';

/**
 * J01 — Daily Cash Register
 *
 * Records all cash transactions for the day: inflows and outflows with running balance.
 *
 * Endpoints implemented by J01Controller:
 *   POST   /api/accounts/cash/entry  — Add cash entry
 *   GET    /api/accounts/cash/today  — Today's cash register
 *   GET    /api/accounts/cash/balance  — Current cash balance
 */
@Injectable()
export class J01Service {
  constructor(
    @InjectRepository(J01Entity)
    private readonly repo: Repository<J01Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`J01 record ${id} not found`);
    return found;
  }

  create(dto: CreateJ01Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateJ01Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
