import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { L03Controller } from './l03.controller';
import { L03Service } from './l03.service';
import { L03Entity } from './l03.entity';

@Module({
  imports: [TypeOrmModule.forFeature([L03Entity])],
  controllers: [L03Controller],
  providers: [L03Service],
  exports: [L03Service],
})
export class L03Module {}
