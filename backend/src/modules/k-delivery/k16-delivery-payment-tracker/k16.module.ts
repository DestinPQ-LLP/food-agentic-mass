import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { K16Controller } from './k16.controller';
import { K16Service } from './k16.service';
import { K16Entity } from './k16.entity';

@Module({
  imports: [TypeOrmModule.forFeature([K16Entity])],
  controllers: [K16Controller],
  providers: [K16Service],
  exports: [K16Service],
})
export class K16Module {}
