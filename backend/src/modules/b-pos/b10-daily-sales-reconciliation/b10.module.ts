import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { B10Controller } from './b10.controller';
import { B10Service } from './b10.service';
import { B10Entity } from './b10.entity';

@Module({
  imports: [TypeOrmModule.forFeature([B10Entity])],
  controllers: [B10Controller],
  providers: [B10Service],
  exports: [B10Service],
})
export class B10Module {}
