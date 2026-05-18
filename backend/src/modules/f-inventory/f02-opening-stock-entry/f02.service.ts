import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { F02Entity } from './f02.entity';
import { CreateF02Dto } from './dto/create-f02.dto';
import { UpdateF02Dto } from './dto/update-f02.dto';

/**
 * F02 — Opening Stock Entry
 *
 * Daily screen for entering beginning-of-day stock quantities for each inventory item.
 *
 * Endpoints implemented by F02Controller:
 *   POST   /api/inventory/stock/opening  — Submit opening stock
 *   GET    /api/inventory/stock/opening/today  — Today's opening stock
 *   GET    /api/inventory/stock/opening/history  — Opening stock history
 */
@Injectable()
export class F02Service {
  constructor(
    @InjectRepository(F02Entity)
    private readonly repo: Repository<F02Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`F02 record ${id} not found`);
    return found;
  }

  create(dto: CreateF02Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateF02Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
