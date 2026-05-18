import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { N16Controller } from './n16.controller';
import { N16Service } from './n16.service';
import { N16Entity } from './n16.entity';

@Module({
  imports: [TypeOrmModule.forFeature([N16Entity])],
  controllers: [N16Controller],
  providers: [N16Service],
  exports: [N16Service],
})
export class N16Module {}
