import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { F16Controller } from './f16.controller';
import { F16Service } from './f16.service';
import { F16Entity } from './f16.entity';

@Module({
  imports: [TypeOrmModule.forFeature([F16Entity])],
  controllers: [F16Controller],
  providers: [F16Service],
  exports: [F16Service],
})
export class F16Module {}
