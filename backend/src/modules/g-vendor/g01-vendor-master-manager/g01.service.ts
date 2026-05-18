import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { G01Entity } from './g01.entity';
import { CreateG01Dto } from './dto/create-g01.dto';
import { UpdateG01Dto } from './dto/update-g01.dto';

/**
 * G01 — Vendor Master Manager
 *
 * Manage the list of vendors with contact, supplied items, payment terms, and lead time.
 *
 * Endpoints implemented by G01Controller:
 *   POST   /api/vendors  — Create vendor
 *   GET    /api/vendors  — List vendors
 *   PUT    /api/vendors/:id  — Update vendor
 */
@Injectable()
export class G01Service {
  constructor(
    @InjectRepository(G01Entity)
    private readonly repo: Repository<G01Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`G01 record ${id} not found`);
    return found;
  }

  create(dto: CreateG01Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateG01Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
