import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { B05Entity } from './b05.entity';
import { CreateB05Dto } from './dto/create-b05.dto';
import { UpdateB05Dto } from './dto/update-b05.dto';

/**
 * B05 — Token Generator
 *
 * Prints or displays a sequential token number when an order is placed at the counter.
 *
 * Endpoints implemented by B05Controller:
 *   POST   /api/pos/tokens  — Generate token for order
 *   GET    /api/pos/tokens/next  — Peek next token number
 *   GET    /api/pos/tokens/today  — All tokens for today
 */
@Injectable()
export class B05Service {
  constructor(
    @InjectRepository(B05Entity)
    private readonly repo: Repository<B05Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`B05 record ${id} not found`);
    return found;
  }

  create(dto: CreateB05Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateB05Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
