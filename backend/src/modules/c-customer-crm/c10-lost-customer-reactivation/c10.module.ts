import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { C10Controller } from './c10.controller';
import { C10Service } from './c10.service';
import { C10Entity } from './c10.entity';

@Module({
  imports: [TypeOrmModule.forFeature([C10Entity])],
  controllers: [C10Controller],
  providers: [C10Service],
  exports: [C10Service],
})
export class C10Module {}
