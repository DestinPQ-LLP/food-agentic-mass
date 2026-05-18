import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { D18Controller } from './d18.controller';
import { D18Service } from './d18.service';
import { D18Entity } from './d18.entity';

@Module({
  imports: [TypeOrmModule.forFeature([D18Entity])],
  controllers: [D18Controller],
  providers: [D18Service],
  exports: [D18Service],
})
export class D18Module {}
