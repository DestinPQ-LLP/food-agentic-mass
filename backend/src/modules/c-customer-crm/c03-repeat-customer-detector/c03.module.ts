import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { C03Controller } from './c03.controller';
import { C03Service } from './c03.service';
import { C03Entity } from './c03.entity';

@Module({
  imports: [TypeOrmModule.forFeature([C03Entity])],
  controllers: [C03Controller],
  providers: [C03Service],
  exports: [C03Service],
})
export class C03Module {}
