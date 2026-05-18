import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { N18Controller } from './n18.controller';
import { N18Service } from './n18.service';
import { N18Entity } from './n18.entity';

@Module({
  imports: [TypeOrmModule.forFeature([N18Entity])],
  controllers: [N18Controller],
  providers: [N18Service],
  exports: [N18Service],
})
export class N18Module {}
