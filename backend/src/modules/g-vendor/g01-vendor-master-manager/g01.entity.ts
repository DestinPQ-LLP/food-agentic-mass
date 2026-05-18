import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

/**
 * G01 — Vendor Master Manager
 * Manage the list of vendors with contact, supplied items, payment terms, and lead time.
 *
 * Phase 1. Category: Vendor.
 */
@Entity('g01_records')
export class G01Entity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'varchar', length: 64, nullable: true })
  branchId?: string;

  // Free-form domain payload until offering-specific columns are defined.
  @Column({ type: 'jsonb', default: () => "'{}'" })
  data: Record<string, any>;

  @Column({ type: 'varchar', length: 32, nullable: true })
  status?: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
