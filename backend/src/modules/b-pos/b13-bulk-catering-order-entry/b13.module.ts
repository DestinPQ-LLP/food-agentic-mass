import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { B13Controller } from './b13.controller';
import { B13Service } from './b13.service';
import { B13Entity } from './b13.entity';

@Module({
  imports: [TypeOrmModule.forFeature([B13Entity])],
  controllers: [B13Controller],
  providers: [B13Service],
  exports: [B13Service],
})
export class B13Module {}
