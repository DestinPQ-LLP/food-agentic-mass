import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

/**
 * E07 — Wastage Entry Screen
 * Kitchen staff logs food wastage by item and reason code to build a wastage history.
 *
 * Phase 1. Category: Kitchen.
 */
@Entity('e07_records')
export class E07Entity {
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
