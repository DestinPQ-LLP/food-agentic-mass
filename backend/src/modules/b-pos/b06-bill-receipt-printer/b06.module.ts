import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { B06Controller } from './b06.controller';
import { B06Service } from './b06.service';
import { B06Entity } from './b06.entity';

@Module({
  imports: [TypeOrmModule.forFeature([B06Entity])],
  controllers: [B06Controller],
  providers: [B06Service],
  exports: [B06Service],
})
export class B06Module {}
