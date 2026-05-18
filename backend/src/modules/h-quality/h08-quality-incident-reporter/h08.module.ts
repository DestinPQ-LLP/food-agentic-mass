import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { H08Controller } from './h08.controller';
import { H08Service } from './h08.service';
import { H08Entity } from './h08.entity';

@Module({
  imports: [TypeOrmModule.forFeature([H08Entity])],
  controllers: [H08Controller],
  providers: [H08Service],
  exports: [H08Service],
})
export class H08Module {}
