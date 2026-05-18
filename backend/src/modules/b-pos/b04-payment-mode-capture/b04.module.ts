import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { B04Controller } from './b04.controller';
import { B04Service } from './b04.service';
import { B04Entity } from './b04.entity';

@Module({
  imports: [TypeOrmModule.forFeature([B04Entity])],
  controllers: [B04Controller],
  providers: [B04Service],
  exports: [B04Service],
})
export class B04Module {}
