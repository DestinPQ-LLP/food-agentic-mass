import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { C04Controller } from './c04.controller';
import { C04Service } from './c04.service';
import { C04Entity } from './c04.entity';

@Module({
  imports: [TypeOrmModule.forFeature([C04Entity])],
  controllers: [C04Controller],
  providers: [C04Service],
  exports: [C04Service],
})
export class C04Module {}
