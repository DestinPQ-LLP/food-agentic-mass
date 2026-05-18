import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { C15Entity } from './c15.entity';
import { CreateC15Dto } from './dto/create-c15.dto';
import { UpdateC15Dto } from './dto/update-c15.dto';

/**
 * C15 — Selfie/Face Abstraction Module
 *
 * Optional consent-based module that captures face embedding for returning-customer recognition.
 *
 * Endpoints implemented by C15Controller:
 *   POST   /api/crm/face/enrol  — Enrol customer face (consent required)
 *   POST   /api/crm/face/identify  — Identify customer from camera frame
 *   DELETE /api/crm/face/:customerId  — Delete face data on request
 */
@Injectable()
export class C15Service {
  constructor(
    @InjectRepository(C15Entity)
    private readonly repo: Repository<C15Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`C15 record ${id} not found`);
    return found;
  }

  create(dto: CreateC15Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateC15Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
