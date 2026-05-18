import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { F10Controller } from './f10.controller';
import { F10Service } from './f10.service';
import { F10Entity } from './f10.entity';

@Module({
  imports: [TypeOrmModule.forFeature([F10Entity])],
  controllers: [F10Controller],
  providers: [F10Service],
  exports: [F10Service],
})
export class F10Module {}
