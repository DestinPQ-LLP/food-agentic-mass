import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { M18Controller } from './m18.controller';
import { M18Service } from './m18.service';
import { M18Entity } from './m18.entity';

@Module({
  imports: [TypeOrmModule.forFeature([M18Entity])],
  controllers: [M18Controller],
  providers: [M18Service],
  exports: [M18Service],
})
export class M18Module {}
