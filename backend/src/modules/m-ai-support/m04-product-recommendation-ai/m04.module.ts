import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { M04Controller } from './m04.controller';
import { M04Service } from './m04.service';
import { M04Entity } from './m04.entity';

@Module({
  imports: [TypeOrmModule.forFeature([M04Entity])],
  controllers: [M04Controller],
  providers: [M04Service],
  exports: [M04Service],
})
export class M04Module {}
