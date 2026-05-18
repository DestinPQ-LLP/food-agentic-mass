import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { M06Entity } from './m06.entity';
import { CreateM06Dto } from './dto/create-m06.dto';
import { UpdateM06Dto } from './dto/update-m06.dto';

/**
 * M06 — Sales Anomaly Detector
 *
 * Flags unusually high or low sales days, hours, or items for investigation.
 *
 * Endpoints implemented by M06Controller:
 *   GET    /api/ai/anomalies  — Sales anomalies for period
 *   GET    /api/ai/anomalies/today  — Today's anomalies
 *   PUT    /api/ai/anomalies/settings  — Configure sensitivity
 */
@Injectable()
export class M06Service {
  constructor(
    @InjectRepository(M06Entity)
    private readonly repo: Repository<M06Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`M06 record ${id} not found`);
    return found;
  }

  create(dto: CreateM06Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateM06Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
