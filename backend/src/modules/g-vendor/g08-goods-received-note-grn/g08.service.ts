import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { G08Entity } from './g08.entity';
import { CreateG08Dto } from './dto/create-g08.dto';
import { UpdateG08Dto } from './dto/update-g08.dto';

/**
 * G08 — Goods Received Note (GRN)
 *
 * Records actual quantities received against a PO, handling partial deliveries.
 *
 * Endpoints implemented by G08Controller:
 *   POST   /api/vendors/grn  — Create GRN against PO
 *   GET    /api/vendors/grn  — List GRNs
 *   GET    /api/vendors/grn/:id  — GRN details
 */
@Injectable()
export class G08Service {
  constructor(
    @InjectRepository(G08Entity)
    private readonly repo: Repository<G08Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`G08 record ${id} not found`);
    return found;
  }

  create(dto: CreateG08Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateG08Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
