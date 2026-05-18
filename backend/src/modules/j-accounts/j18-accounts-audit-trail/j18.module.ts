import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { J18Controller } from './j18.controller';
import { J18Service } from './j18.service';
import { J18Entity } from './j18.entity';

@Module({
  imports: [TypeOrmModule.forFeature([J18Entity])],
  controllers: [J18Controller],
  providers: [J18Service],
  exports: [J18Service],
})
export class J18Module {}
