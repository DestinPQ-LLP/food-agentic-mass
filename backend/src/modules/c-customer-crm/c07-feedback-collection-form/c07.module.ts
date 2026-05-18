import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { C07Controller } from './c07.controller';
import { C07Service } from './c07.service';
import { C07Entity } from './c07.entity';

@Module({
  imports: [TypeOrmModule.forFeature([C07Entity])],
  controllers: [C07Controller],
  providers: [C07Service],
  exports: [C07Service],
})
export class C07Module {}
