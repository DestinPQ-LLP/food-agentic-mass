import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { E13Controller } from './e13.controller';
import { E13Service } from './e13.service';
import { E13Entity } from './e13.entity';

@Module({
  imports: [TypeOrmModule.forFeature([E13Entity])],
  controllers: [E13Controller],
  providers: [E13Service],
  exports: [E13Service],
})
export class E13Module {}
