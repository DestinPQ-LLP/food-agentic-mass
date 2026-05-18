import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { K05Controller } from './k05.controller';
import { K05Service } from './k05.service';
import { K05Entity } from './k05.entity';

@Module({
  imports: [TypeOrmModule.forFeature([K05Entity])],
  controllers: [K05Controller],
  providers: [K05Service],
  exports: [K05Service],
})
export class K05Module {}
