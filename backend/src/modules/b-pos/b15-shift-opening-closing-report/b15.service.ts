import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { B15Entity } from './b15.entity';
import { CreateB15Dto } from './dto/create-b15.dto';
import { UpdateB15Dto } from './dto/update-b15.dto';

/**
 * B15 — Shift Opening/Closing Report
 *
 * Summary of orders, revenue, and cash for a cashier's shift, auto-generated at shift boundaries.
 *
 * Endpoints implemented by B15Controller:
 *   POST   /api/pos/shifts/open  — Open a shift
 *   POST   /api/pos/shifts/close  — Close a shift with summary
 *   GET    /api/pos/shifts/:id/report  — Get shift report
 */
@Injectable()
export class B15Service {
  constructor(
    @InjectRepository(B15Entity)
    private readonly repo: Repository<B15Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`B15 record ${id} not found`);
    return found;
  }

  create(dto: CreateB15Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateB15Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
