import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { E12Entity } from './e12.entity';
import { CreateE12Dto } from './dto/create-e12.dto';
import { UpdateE12Dto } from './dto/update-e12.dto';

/**
 * E12 — Recipe/BOM Viewer
 *
 * Shows kitchen staff the ingredients, quantities, and steps for each menu item.
 *
 * Endpoints implemented by E12Controller:
 *   GET    /api/kitchen/recipes/:itemId  — Recipe for a specific item
 *   GET    /api/kitchen/recipes  — All recipes
 *   PUT    /api/kitchen/recipes/:itemId  — Update recipe
 */
@Injectable()
export class E12Service {
  constructor(
    @InjectRepository(E12Entity)
    private readonly repo: Repository<E12Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`E12 record ${id} not found`);
    return found;
  }

  create(dto: CreateE12Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateE12Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
