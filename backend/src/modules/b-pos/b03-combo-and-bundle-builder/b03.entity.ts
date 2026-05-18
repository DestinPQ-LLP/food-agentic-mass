import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

/**
 * B03 — Combo & Bundle Builder
 * Admin interface to create combos (e.g., Idli + Sambar + Coffee) with a bundled price.
 *
 * Phase 1. Category: POS & Billing.
 */
@Entity('b03_records')
export class B03Entity {
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
