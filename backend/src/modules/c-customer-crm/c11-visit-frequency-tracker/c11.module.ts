import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { C11Controller } from './c11.controller';
import { C11Service } from './c11.service';
import { C11Entity } from './c11.entity';

@Module({
  imports: [TypeOrmModule.forFeature([C11Entity])],
  controllers: [C11Controller],
  providers: [C11Service],
  exports: [C11Service],
})
export class C11Module {}
