import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { A04Entity } from './a04.entity';
import { CreateA04Dto } from './dto/create-a04.dto';
import { UpdateA04Dto } from './dto/update-a04.dto';

/**
 * A04 — WhatsApp MIS Dispatch
 *
 * Automatically composes and sends the owner a structured daily MIS report via WhatsApp at a scheduled time.
 *
 * Endpoints implemented by A04Controller:
 *   POST   /api/owner/mis/send  — Trigger MIS WhatsApp send
 *   GET    /api/owner/mis/preview  — Preview today's MIS message
 *   PUT    /api/owner/mis/schedule  — Update send schedule
 */
@Injectable()
export class A04Service {
  constructor(
    @InjectRepository(A04Entity)
    private readonly repo: Repository<A04Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`A04 record ${id} not found`);
    return found;
  }

  create(dto: CreateA04Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateA04Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
