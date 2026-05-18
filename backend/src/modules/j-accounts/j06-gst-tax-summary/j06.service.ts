import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { J06Entity } from './j06.entity';
import { CreateJ06Dto } from './dto/create-j06.dto';
import { UpdateJ06Dto } from './dto/update-j06.dto';

/**
 * J06 — GST/Tax Summary
 *
 * Calculates total GST collected and input tax credit for a period, ready for filing.
 *
 * Endpoints implemented by J06Controller:
 *   GET    /api/accounts/gst/summary  — GST summary for period
 *   GET    /api/accounts/gst/by-slab  — GST by tax slab
 *   GET    /api/accounts/gst/export  — Export GST report
 */
@Injectable()
export class J06Service {
  constructor(
    @InjectRepository(J06Entity)
    private readonly repo: Repository<J06Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`J06 record ${id} not found`);
    return found;
  }

  create(dto: CreateJ06Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateJ06Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
