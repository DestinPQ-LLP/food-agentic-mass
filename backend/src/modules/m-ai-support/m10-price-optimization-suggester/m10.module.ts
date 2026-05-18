import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { M10Controller } from './m10.controller';
import { M10Service } from './m10.service';
import { M10Entity } from './m10.entity';

@Module({
  imports: [TypeOrmModule.forFeature([M10Entity])],
  controllers: [M10Controller],
  providers: [M10Service],
  exports: [M10Service],
})
export class M10Module {}
