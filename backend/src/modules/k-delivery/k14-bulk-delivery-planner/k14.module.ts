import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { K14Controller } from './k14.controller';
import { K14Service } from './k14.service';
import { K14Entity } from './k14.entity';

@Module({
  imports: [TypeOrmModule.forFeature([K14Entity])],
  controllers: [K14Controller],
  providers: [K14Service],
  exports: [K14Service],
})
export class K14Module {}
