import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { E06Controller } from './e06.controller';
import { E06Service } from './e06.service';
import { E06Entity } from './e06.entity';

@Module({
  imports: [TypeOrmModule.forFeature([E06Entity])],
  controllers: [E06Controller],
  providers: [E06Service],
  exports: [E06Service],
})
export class E06Module {}
