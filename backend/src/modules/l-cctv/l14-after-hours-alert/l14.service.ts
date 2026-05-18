import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { L14Entity } from './l14.entity';
import { CreateL14Dto } from './dto/create-l14.dto';
import { UpdateL14Dto } from './dto/update-l14.dto';

/**
 * L14 — After-Hours Alert
 *
 * Sends an immediate WhatsApp alert if any entry is detected after store closing time.
 *
 * Endpoints implemented by L14Controller:
 *   GET    /api/cctv/after-hours/alerts  — After-hours alerts
 *   PUT    /api/cctv/after-hours/settings  — Set closing time and alert recipient
 *   GET    /api/cctv/after-hours/log  — Alert history
 */
@Injectable()
export class L14Service {
  constructor(
    @InjectRepository(L14Entity)
    private readonly repo: Repository<L14Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`L14 record ${id} not found`);
    return found;
  }

  create(dto: CreateL14Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateL14Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
