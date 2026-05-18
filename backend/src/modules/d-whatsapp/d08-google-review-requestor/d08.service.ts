import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { D08Entity } from './d08.entity';
import { CreateD08Dto } from './dto/create-d08.dto';
import { UpdateD08Dto } from './dto/update-d08.dto';

/**
 * D08 — Google Review Requestor
 *
 * Sends a WhatsApp message with the Google Maps review link to customers who gave 4+ star ratings.
 *
 * Endpoints implemented by D08Controller:
 *   POST   /api/whatsapp/review-request/send  — Send review request
 *   PUT    /api/whatsapp/review-request/settings  — Set rating threshold and link
 *   GET    /api/whatsapp/review-request/history  — Send history
 */
@Injectable()
export class D08Service {
  constructor(
    @InjectRepository(D08Entity)
    private readonly repo: Repository<D08Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`D08 record ${id} not found`);
    return found;
  }

  create(dto: CreateD08Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateD08Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
