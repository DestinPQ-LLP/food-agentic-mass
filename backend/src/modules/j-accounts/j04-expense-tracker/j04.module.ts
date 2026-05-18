import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { J04Controller } from './j04.controller';
import { J04Service } from './j04.service';
import { J04Entity } from './j04.entity';

@Module({
  imports: [TypeOrmModule.forFeature([J04Entity])],
  controllers: [J04Controller],
  providers: [J04Service],
  exports: [J04Service],
})
export class J04Module {}
