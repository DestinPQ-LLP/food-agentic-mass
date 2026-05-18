import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { N12Entity } from './n12.entity';
import { CreateN12Dto } from './dto/create-n12.dto';
import { UpdateN12Dto } from './dto/update-n12.dto';

/**
 * N12 — Role-based Multi-Branch Access
 *
 * Controls which staff can see and act on data for which branches.
 *
 * Endpoints implemented by N12Controller:
 *   PUT    /api/branches/access/:userId  — Set user branch access
 *   GET    /api/branches/access/:userId  — Get user branch permissions
 *   GET    /api/branches/access/audit  — Access change audit log
 */
@Injectable()
export class N12Service {
  constructor(
    @InjectRepository(N12Entity)
    private readonly repo: Repository<N12Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`N12 record ${id} not found`);
    return found;
  }

  create(dto: CreateN12Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateN12Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
