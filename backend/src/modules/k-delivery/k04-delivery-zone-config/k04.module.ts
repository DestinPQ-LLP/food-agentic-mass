import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { K04Controller } from './k04.controller';
import { K04Service } from './k04.service';
import { K04Entity } from './k04.entity';

@Module({
  imports: [TypeOrmModule.forFeature([K04Entity])],
  controllers: [K04Controller],
  providers: [K04Service],
  exports: [K04Service],
})
export class K04Module {}
