import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { H02Controller } from './h02.controller';
import { H02Service } from './h02.service';
import { H02Entity } from './h02.entity';

@Module({
  imports: [TypeOrmModule.forFeature([H02Entity])],
  controllers: [H02Controller],
  providers: [H02Service],
  exports: [H02Service],
})
export class H02Module {}
