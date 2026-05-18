import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { C16Controller } from './c16.controller';
import { C16Service } from './c16.service';
import { C16Entity } from './c16.entity';

@Module({
  imports: [TypeOrmModule.forFeature([C16Entity])],
  controllers: [C16Controller],
  providers: [C16Service],
  exports: [C16Service],
})
export class C16Module {}
