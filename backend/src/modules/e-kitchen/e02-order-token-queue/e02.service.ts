import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { E02Entity } from './e02.entity';
import { CreateE02Dto } from './dto/create-e02.dto';
import { UpdateE02Dto } from './dto/update-e02.dto';

/**
 * E02 — Order Token Queue
 *
 * Sequential token number display for kitchen to prepare in order, with sound alert on new token.
 *
 * Endpoints implemented by E02Controller:
 *   GET    /api/kitchen/tokens/queue  — Current token queue
 *   PUT    /api/kitchen/tokens/:id/call  — Call a token
 *   POST   /api/kitchen/tokens/reset  — Reset token counter
 */
@Injectable()
export class E02Service {
  constructor(
    @InjectRepository(E02Entity)
    private readonly repo: Repository<E02Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`E02 record ${id} not found`);
    return found;
  }

  create(dto: CreateE02Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateE02Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
