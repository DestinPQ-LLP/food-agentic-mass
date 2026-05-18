import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { E16Controller } from './e16.controller';
import { E16Service } from './e16.service';
import { E16Entity } from './e16.entity';

@Module({
  imports: [TypeOrmModule.forFeature([E16Entity])],
  controllers: [E16Controller],
  providers: [E16Service],
  exports: [E16Service],
})
export class E16Module {}
