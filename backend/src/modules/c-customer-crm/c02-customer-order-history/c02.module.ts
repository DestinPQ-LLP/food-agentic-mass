import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { C02Controller } from './c02.controller';
import { C02Service } from './c02.service';
import { C02Entity } from './c02.entity';

@Module({
  imports: [TypeOrmModule.forFeature([C02Entity])],
  controllers: [C02Controller],
  providers: [C02Service],
  exports: [C02Service],
})
export class C02Module {}
