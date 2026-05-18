import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { C01Entity } from './c01.entity';
import { CreateC01Dto } from './dto/create-c01.dto';
import { UpdateC01Dto } from './dto/update-c01.dto';

/**
 * C01 — Customer Phone Capture
 *
 * Captures customer mobile number at billing with optional name, used as the primary CRM identifier.
 *
 * Endpoints implemented by C01Controller:
 *   POST   /api/crm/customers  — Create or find customer by phone
 *   GET    /api/crm/customers/:phone  — Look up customer by mobile
 *   PUT    /api/crm/customers/:id  — Update customer profile
 */
@Injectable()
export class C01Service {
  constructor(
    @InjectRepository(C01Entity)
    private readonly repo: Repository<C01Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`C01 record ${id} not found`);
    return found;
  }

  create(dto: CreateC01Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateC01Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
