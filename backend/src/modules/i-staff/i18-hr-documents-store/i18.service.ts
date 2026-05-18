import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { I18Entity } from './i18.entity';
import { CreateI18Dto } from './dto/create-i18.dto';
import { UpdateI18Dto } from './dto/update-i18.dto';

/**
 * I18 — HR Documents Store
 *
 * Stores employee contracts, ID copies, and HR documents with role-based access.
 *
 * Endpoints implemented by I18Controller:
 *   POST   /api/staff/documents  — Upload HR document
 *   GET    /api/staff/documents/:staffId  — Documents by staff
 *   DELETE /api/staff/documents/:id  — Delete document
 */
@Injectable()
export class I18Service {
  constructor(
    @InjectRepository(I18Entity)
    private readonly repo: Repository<I18Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`I18 record ${id} not found`);
    return found;
  }

  create(dto: CreateI18Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateI18Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
