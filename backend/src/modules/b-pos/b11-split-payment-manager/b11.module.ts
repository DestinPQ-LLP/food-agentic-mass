import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { B11Controller } from './b11.controller';
import { B11Service } from './b11.service';
import { B11Entity } from './b11.entity';

@Module({
  imports: [TypeOrmModule.forFeature([B11Entity])],
  controllers: [B11Controller],
  providers: [B11Service],
  exports: [B11Service],
})
export class B11Module {}
