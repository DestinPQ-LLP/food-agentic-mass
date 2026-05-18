import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { L18Controller } from './l18.controller';
import { L18Service } from './l18.service';
import { L18Entity } from './l18.entity';

@Module({
  imports: [TypeOrmModule.forFeature([L18Entity])],
  controllers: [L18Controller],
  providers: [L18Service],
  exports: [L18Service],
})
export class L18Module {}
