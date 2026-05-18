import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { M16Controller } from './m16.controller';
import { M16Service } from './m16.service';
import { M16Entity } from './m16.entity';

@Module({
  imports: [TypeOrmModule.forFeature([M16Entity])],
  controllers: [M16Controller],
  providers: [M16Service],
  exports: [M16Service],
})
export class M16Module {}
