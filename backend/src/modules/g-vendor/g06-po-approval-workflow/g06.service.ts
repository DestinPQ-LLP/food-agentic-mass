import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { G06Entity } from './g06.entity';
import { CreateG06Dto } from './dto/create-g06.dto';
import { UpdateG06Dto } from './dto/update-g06.dto';

/**
 * G06 — PO Approval Workflow
 *
 * Two-step approval for POs above a configurable value threshold.
 *
 * Endpoints implemented by G06Controller:
 *   PUT    /api/vendors/purchase-orders/:id/approve  — Approve PO
 *   PUT    /api/vendors/purchase-orders/:id/reject  — Reject PO with reason
 *   GET    /api/vendors/purchase-orders/pending-approval  — POs awaiting approval
 */
@Injectable()
export class G06Service {
  constructor(
    @InjectRepository(G06Entity)
    private readonly repo: Repository<G06Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`G06 record ${id} not found`);
    return found;
  }

  create(dto: CreateG06Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateG06Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
