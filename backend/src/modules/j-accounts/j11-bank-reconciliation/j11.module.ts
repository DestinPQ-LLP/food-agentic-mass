import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { J11Controller } from './j11.controller';
import { J11Service } from './j11.service';
import { J11Entity } from './j11.entity';

@Module({
  imports: [TypeOrmModule.forFeature([J11Entity])],
  controllers: [J11Controller],
  providers: [J11Service],
  exports: [J11Service],
})
export class J11Module {}
