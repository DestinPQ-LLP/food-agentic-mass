import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsObject, IsOptional, IsString } from 'class-validator';

export class CreateN14Dto {
  @ApiPropertyOptional({ description: 'Branch the record belongs to' })
  @IsOptional()
  @IsString()
  branchId?: string;

  @ApiPropertyOptional({ description: 'Optional status flag (e.g. draft, active, archived)' })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({
    description: 'Franchise Management Module payload (offering-specific JSON shape; refine when business rules are known)',
    type: 'object',
    additionalProperties: true,
    example: {},
  })
  @IsObject()
  data: Record<string, any>;
}
