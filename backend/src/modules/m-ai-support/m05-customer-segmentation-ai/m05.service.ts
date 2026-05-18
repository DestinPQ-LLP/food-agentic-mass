import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { M05Entity } from './m05.entity';
import { CreateM05Dto } from './dto/create-m05.dto';
import { UpdateM05Dto } from './dto/update-m05.dto';

/**
 * M05 — Customer Segmentation AI
 *
 * Automatically classifies customers into behaviour clusters using ML on order history.
 *
 * Endpoints implemented by M05Controller:
 *   POST   /api/ai/segmentation/run  — Run customer segmentation
 *   GET    /api/ai/segmentation/clusters  — Customer clusters
 *   GET    /api/ai/segmentation/customer/:id  — Cluster assignment for customer
 */
@Injectable()
export class M05Service {
  constructor(
    @InjectRepository(M05Entity)
    private readonly repo: Repository<M05Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`M05 record ${id} not found`);
    return found;
  }

  create(dto: CreateM05Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateM05Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
