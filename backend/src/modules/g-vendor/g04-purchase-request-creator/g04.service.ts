import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { G04Entity } from './g04.entity';
import { CreateG04Dto } from './dto/create-g04.dto';
import { UpdateG04Dto } from './dto/update-g04.dto';

/**
 * G04 — Purchase Request Creator
 *
 * Staff raises a procurement request that goes to manager for approval before a PO is generated.
 *
 * Endpoints implemented by G04Controller:
 *   POST   /api/vendors/requests  — Create purchase request
 *   GET    /api/vendors/requests  — List all requests
 *   PUT    /api/vendors/requests/:id/approve  — Approve request
 */
@Injectable()
export class G04Service {
  constructor(
    @InjectRepository(G04Entity)
    private readonly repo: Repository<G04Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`G04 record ${id} not found`);
    return found;
  }

  create(dto: CreateG04Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateG04Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
