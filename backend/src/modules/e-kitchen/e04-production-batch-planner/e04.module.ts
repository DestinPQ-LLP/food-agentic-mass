import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { E04Controller } from './e04.controller';
import { E04Service } from './e04.service';
import { E04Entity } from './e04.entity';

@Module({
  imports: [TypeOrmModule.forFeature([E04Entity])],
  controllers: [E04Controller],
  providers: [E04Service],
  exports: [E04Service],
})
export class E04Module {}
