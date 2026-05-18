import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { I12Entity } from './i12.entity';
import { CreateI12Dto } from './dto/create-i12.dto';
import { UpdateI12Dto } from './dto/update-i12.dto';

/**
 * I12 — Staff Notice Board
 *
 * Digital notice board for posting announcements, policy updates, and general notices.
 *
 * Endpoints implemented by I12Controller:
 *   POST   /api/staff/notices  — Post a notice
 *   GET    /api/staff/notices/active  — Active notices
 *   PUT    /api/staff/notices/:id/archive  — Archive notice
 */
@Injectable()
export class I12Service {
  constructor(
    @InjectRepository(I12Entity)
    private readonly repo: Repository<I12Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`I12 record ${id} not found`);
    return found;
  }

  create(dto: CreateI12Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateI12Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
