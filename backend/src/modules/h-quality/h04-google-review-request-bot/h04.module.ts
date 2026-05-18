import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { H04Controller } from './h04.controller';
import { H04Service } from './h04.service';
import { H04Entity } from './h04.entity';

@Module({
  imports: [TypeOrmModule.forFeature([H04Entity])],
  controllers: [H04Controller],
  providers: [H04Service],
  exports: [H04Service],
})
export class H04Module {}
