import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { I09Entity } from './i09.entity';
import { CreateI09Dto } from './dto/create-i09.dto';
import { UpdateI09Dto } from './dto/update-i09.dto';

/**
 * I09 — Training Record Manager
 *
 * Tracks which staff completed which training modules and when.
 *
 * Endpoints implemented by I09Controller:
 *   POST   /api/staff/training/record  — Log training completion
 *   GET    /api/staff/training/:staffId  — Training records by staff
 *   GET    /api/staff/training/pending  — Staff with incomplete training
 */
@Injectable()
export class I09Service {
  constructor(
    @InjectRepository(I09Entity)
    private readonly repo: Repository<I09Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`I09 record ${id} not found`);
    return found;
  }

  create(dto: CreateI09Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateI09Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
