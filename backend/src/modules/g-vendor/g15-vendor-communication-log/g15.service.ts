import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { G15Entity } from './g15.entity';
import { CreateG15Dto } from './dto/create-g15.dto';
import { UpdateG15Dto } from './dto/update-g15.dto';

/**
 * G15 — Vendor Communication Log
 *
 * Maintains a log of all WhatsApp messages, calls, and notes exchanged with each vendor.
 *
 * Endpoints implemented by G15Controller:
 *   POST   /api/vendors/communications  — Log a communication
 *   GET    /api/vendors/communications/:vendorId  — Communications by vendor
 *   GET    /api/vendors/communications/recent  — Recent communications
 */
@Injectable()
export class G15Service {
  constructor(
    @InjectRepository(G15Entity)
    private readonly repo: Repository<G15Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`G15 record ${id} not found`);
    return found;
  }

  create(dto: CreateG15Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateG15Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
