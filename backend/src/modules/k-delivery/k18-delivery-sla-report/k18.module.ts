import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { K18Controller } from './k18.controller';
import { K18Service } from './k18.service';
import { K18Entity } from './k18.entity';

@Module({
  imports: [TypeOrmModule.forFeature([K18Entity])],
  controllers: [K18Controller],
  providers: [K18Service],
  exports: [K18Service],
})
export class K18Module {}
