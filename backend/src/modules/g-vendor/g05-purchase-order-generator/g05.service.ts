import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { G05Entity } from './g05.entity';
import { CreateG05Dto } from './dto/create-g05.dto';
import { UpdateG05Dto } from './dto/update-g05.dto';

/**
 * G05 — Purchase Order Generator
 *
 * Creates a formal PO from an approved purchase request, linked to a vendor.
 *
 * Endpoints implemented by G05Controller:
 *   POST   /api/vendors/purchase-orders  — Create PO
 *   GET    /api/vendors/purchase-orders  — List POs
 *   GET    /api/vendors/purchase-orders/:id  — PO details
 */
@Injectable()
export class G05Service {
  constructor(
    @InjectRepository(G05Entity)
    private readonly repo: Repository<G05Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`G05 record ${id} not found`);
    return found;
  }

  create(dto: CreateG05Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateG05Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
