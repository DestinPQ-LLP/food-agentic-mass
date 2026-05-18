import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { H11Controller } from './h11.controller';
import { H11Service } from './h11.service';
import { H11Entity } from './h11.entity';

@Module({
  imports: [TypeOrmModule.forFeature([H11Entity])],
  controllers: [H11Controller],
  providers: [H11Service],
  exports: [H11Service],
})
export class H11Module {}
