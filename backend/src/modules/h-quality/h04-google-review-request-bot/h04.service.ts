import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { H04Entity } from './h04.entity';
import { CreateH04Dto } from './dto/create-h04.dto';
import { UpdateH04Dto } from './dto/update-h04.dto';

/**
 * H04 — Google Review Request Bot
 *
 * Sends review request to customers with 4+ star internal rating.
 *
 * Endpoints implemented by H04Controller:
 *   POST   /api/quality/review-request/send  — Send review request
 *   PUT    /api/quality/review-request/settings  — Set threshold and Google link
 *   GET    /api/quality/review-request/history  — Send history
 */
@Injectable()
export class H04Service {
  constructor(
    @InjectRepository(H04Entity)
    private readonly repo: Repository<H04Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`H04 record ${id} not found`);
    return found;
  }

  create(dto: CreateH04Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateH04Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
