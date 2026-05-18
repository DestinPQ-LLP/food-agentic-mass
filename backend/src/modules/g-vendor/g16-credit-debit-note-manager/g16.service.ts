import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { G16Entity } from './g16.entity';
import { CreateG16Dto } from './dto/create-g16.dto';
import { UpdateG16Dto } from './dto/update-g16.dto';

/**
 * G16 — Credit/Debit Note Manager
 *
 * Handles vendor returns, short supplies, and rate adjustments through credit/debit notes.
 *
 * Endpoints implemented by G16Controller:
 *   POST   /api/vendors/credit-notes  — Create credit note
 *   POST   /api/vendors/debit-notes  — Create debit note
 *   GET    /api/vendors/credit-notes/:vendorId  — Credit notes by vendor
 */
@Injectable()
export class G16Service {
  constructor(
    @InjectRepository(G16Entity)
    private readonly repo: Repository<G16Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`G16 record ${id} not found`);
    return found;
  }

  create(dto: CreateG16Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateG16Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
