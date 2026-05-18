import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { I01Entity } from './i01.entity';
import { CreateI01Dto } from './dto/create-i01.dto';
import { UpdateI01Dto } from './dto/update-i01.dto';

/**
 * I01 — Staff Master & Roles
 *
 * Manages staff profiles, roles (cashier, kitchen, inventory, manager), and login credentials.
 *
 * Endpoints implemented by I01Controller:
 *   POST   /api/staff  — Create staff member
 *   GET    /api/staff  — List staff
 *   PUT    /api/staff/:id/role  — Update staff role
 */
@Injectable()
export class I01Service {
  constructor(
    @InjectRepository(I01Entity)
    private readonly repo: Repository<I01Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`I01 record ${id} not found`);
    return found;
  }

  create(dto: CreateI01Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateI01Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
