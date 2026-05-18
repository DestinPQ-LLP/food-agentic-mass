import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { D04Controller } from './d04.controller';
import { D04Service } from './d04.service';
import { D04Entity } from './d04.entity';

@Module({
  imports: [TypeOrmModule.forFeature([D04Entity])],
  controllers: [D04Controller],
  providers: [D04Service],
  exports: [D04Service],
})
export class D04Module {}
