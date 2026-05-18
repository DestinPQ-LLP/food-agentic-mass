import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { N05Entity } from './n05.entity';
import { CreateN05Dto } from './dto/create-n05.dto';
import { UpdateN05Dto } from './dto/update-n05.dto';

/**
 * N05 — Inter-Branch Stock Transfer
 *
 * Initiates stock transfer between branches to balance inventory levels.
 *
 * Endpoints implemented by N05Controller:
 *   POST   /api/branches/transfers  — Create inter-branch transfer
 *   GET    /api/branches/transfers  — List transfers
 *   PUT    /api/branches/transfers/:id/approve  — Approve transfer
 */
@Injectable()
export class N05Service {
  constructor(
    @InjectRepository(N05Entity)
    private readonly repo: Repository<N05Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`N05 record ${id} not found`);
    return found;
  }

  create(dto: CreateN05Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateN05Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
