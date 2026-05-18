import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { F04Controller } from './f04.controller';
import { F04Service } from './f04.service';
import { F04Entity } from './f04.entity';

@Module({
  imports: [TypeOrmModule.forFeature([F04Entity])],
  controllers: [F04Controller],
  providers: [F04Service],
  exports: [F04Service],
})
export class F04Module {}
