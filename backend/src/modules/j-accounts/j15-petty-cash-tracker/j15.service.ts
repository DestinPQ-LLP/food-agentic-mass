import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { J15Entity } from './j15.entity';
import { CreateJ15Dto } from './dto/create-j15.dto';
import { UpdateJ15Dto } from './dto/update-j15.dto';

/**
 * J15 — Petty Cash Tracker
 *
 * Records small cash expenses from the petty cash fund with category and receipt.
 *
 * Endpoints implemented by J15Controller:
 *   POST   /api/accounts/petty-cash/entry  — Log petty cash entry
 *   GET    /api/accounts/petty-cash/balance  — Current petty cash balance
 *   GET    /api/accounts/petty-cash/log  — Petty cash log
 */
@Injectable()
export class J15Service {
  constructor(
    @InjectRepository(J15Entity)
    private readonly repo: Repository<J15Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`J15 record ${id} not found`);
    return found;
  }

  create(dto: CreateJ15Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateJ15Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
