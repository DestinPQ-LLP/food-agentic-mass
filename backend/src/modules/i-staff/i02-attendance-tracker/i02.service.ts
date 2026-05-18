import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { I02Entity } from './i02.entity';
import { CreateI02Dto } from './dto/create-i02.dto';
import { UpdateI02Dto } from './dto/update-i02.dto';

/**
 * I02 — Attendance Tracker
 *
 * Daily attendance logging with clock-in and clock-out times per staff member.
 *
 * Endpoints implemented by I02Controller:
 *   POST   /api/staff/attendance/clock-in  — Clock in a staff member
 *   POST   /api/staff/attendance/clock-out  — Clock out a staff member
 *   GET    /api/staff/attendance/:date  — Attendance for a date
 */
@Injectable()
export class I02Service {
  constructor(
    @InjectRepository(I02Entity)
    private readonly repo: Repository<I02Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`I02 record ${id} not found`);
    return found;
  }

  create(dto: CreateI02Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateI02Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
