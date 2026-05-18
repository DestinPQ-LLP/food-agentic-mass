import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { D01Entity } from './d01.entity';
import { CreateD01Dto } from './dto/create-d01.dto';
import { UpdateD01Dto } from './dto/update-d01.dto';

/**
 * D01 — Daily Owner MIS Bot
 *
 * Automatically sends the owner a WhatsApp message every morning with prior-day KPIs.
 *
 * Endpoints implemented by D01Controller:
 *   POST   /api/whatsapp/mis/send  — Send MIS now
 *   GET    /api/whatsapp/mis/preview  — Preview today's MIS
 *   PUT    /api/whatsapp/mis/schedule  — Set MIS send time
 */
@Injectable()
export class D01Service {
  constructor(
    @InjectRepository(D01Entity)
    private readonly repo: Repository<D01Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`D01 record ${id} not found`);
    return found;
  }

  create(dto: CreateD01Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateD01Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
