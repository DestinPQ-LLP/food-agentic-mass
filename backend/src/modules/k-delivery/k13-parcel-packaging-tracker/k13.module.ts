import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { K13Controller } from './k13.controller';
import { K13Service } from './k13.service';
import { K13Entity } from './k13.entity';

@Module({
  imports: [TypeOrmModule.forFeature([K13Entity])],
  controllers: [K13Controller],
  providers: [K13Service],
  exports: [K13Service],
})
export class K13Module {}
