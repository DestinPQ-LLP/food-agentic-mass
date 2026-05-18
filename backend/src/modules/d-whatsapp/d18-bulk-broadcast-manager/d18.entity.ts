import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

/**
 * D18 — Bulk Broadcast Manager
 * Segment-targeted mass messaging with scheduling, rate-limiting, and delivery reporting.
 *
 * Phase 3. Category: WhatsApp Marketing.
 */
@Entity('d18_records')
export class D18Entity {
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
