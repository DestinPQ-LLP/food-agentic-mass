import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { J08Entity } from './j08.entity';
import { CreateJ08Dto } from './dto/create-j08.dto';
import { UpdateJ08Dto } from './dto/update-j08.dto';

/**
 * J08 — Payment Collection Tracker
 *
 * Tracks receivables (credit sales or advance orders) and their collection status.
 *
 * Endpoints implemented by J08Controller:
 *   GET    /api/accounts/receivables  — All outstanding receivables
 *   POST   /api/accounts/receivables/collect  — Record collection
 *   GET    /api/accounts/receivables/overdue  — Overdue receivables
 */
@Injectable()
export class J08Service {
  constructor(
    @InjectRepository(J08Entity)
    private readonly repo: Repository<J08Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`J08 record ${id} not found`);
    return found;
  }

  create(dto: CreateJ08Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateJ08Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
