import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { F12Controller } from './f12.controller';
import { F12Service } from './f12.service';
import { F12Entity } from './f12.entity';

@Module({
  imports: [TypeOrmModule.forFeature([F12Entity])],
  controllers: [F12Controller],
  providers: [F12Service],
  exports: [F12Service],
})
export class F12Module {}
