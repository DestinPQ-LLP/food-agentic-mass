import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { K08Entity } from './k08.entity';
import { CreateK08Dto } from './dto/create-k08.dto';
import { UpdateK08Dto } from './dto/update-k08.dto';

/**
 * K08 — Delivery Feedback Collector
 *
 * Requests post-delivery rating from the customer via WhatsApp.
 *
 * Endpoints implemented by K08Controller:
 *   POST   /api/delivery/feedback/request  — Send feedback request
 *   GET    /api/delivery/feedback  — List delivery feedback
 *   GET    /api/delivery/feedback/average  — Average delivery rating
 */
@Injectable()
export class K08Service {
  constructor(
    @InjectRepository(K08Entity)
    private readonly repo: Repository<K08Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`K08 record ${id} not found`);
    return found;
  }

  create(dto: CreateK08Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateK08Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
