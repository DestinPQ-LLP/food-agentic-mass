import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { B16Entity } from './b16.entity';
import { CreateB16Dto } from './dto/create-b16.dto';
import { UpdateB16Dto } from './dto/update-b16.dto';

/**
 * B16 — UPI Payment Verifier
 *
 * Lets cashiers enter UPI transaction reference numbers and flags any unmatched or duplicate references.
 *
 * Endpoints implemented by B16Controller:
 *   POST   /api/pos/upi/verify  — Verify a UPI transaction reference
 *   GET    /api/pos/upi/unmatched  — List unmatched UPI payments
 *   GET    /api/pos/upi/duplicates  — List duplicate UPI references
 */
@Injectable()
export class B16Service {
  constructor(
    @InjectRepository(B16Entity)
    private readonly repo: Repository<B16Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`B16 record ${id} not found`);
    return found;
  }

  create(dto: CreateB16Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateB16Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
