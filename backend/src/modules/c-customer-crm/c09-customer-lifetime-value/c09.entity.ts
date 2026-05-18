import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

/**
 * C09 — Customer Lifetime Value
 * Calculates and displays total spend, visit count, and average order value per customer.
 *
 * Phase 2. Category: Customer CRM.
 */
@Entity('c09_records')
export class C09Entity {
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
