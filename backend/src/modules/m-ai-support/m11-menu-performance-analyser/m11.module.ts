import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { M11Controller } from './m11.controller';
import { M11Service } from './m11.service';
import { M11Entity } from './m11.entity';

@Module({
  imports: [TypeOrmModule.forFeature([M11Entity])],
  controllers: [M11Controller],
  providers: [M11Service],
  exports: [M11Service],
})
export class M11Module {}
