import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { D10Entity } from './d10.entity';
import { CreateD10Dto } from './dto/create-d10.dto';
import { UpdateD10Dto } from './dto/update-d10.dto';

/**
 * D10 — New Menu Announcement
 *
 * Broadcasts a new item or menu change to a selected customer segment via WhatsApp.
 *
 * Endpoints implemented by D10Controller:
 *   POST   /api/whatsapp/menu-announcement/send  — Send announcement
 *   GET    /api/whatsapp/menu-announcement/templates  — Announcement templates
 *   GET    /api/whatsapp/menu-announcement/history  — Announcement history
 */
@Injectable()
export class D10Service {
  constructor(
    @InjectRepository(D10Entity)
    private readonly repo: Repository<D10Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`D10 record ${id} not found`);
    return found;
  }

  create(dto: CreateD10Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateD10Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
