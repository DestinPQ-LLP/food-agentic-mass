import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { N04Controller } from './n04.controller';
import { N04Service } from './n04.service';
import { N04Entity } from './n04.entity';

@Module({
  imports: [TypeOrmModule.forFeature([N04Entity])],
  controllers: [N04Controller],
  providers: [N04Service],
  exports: [N04Service],
})
export class N04Module {}
