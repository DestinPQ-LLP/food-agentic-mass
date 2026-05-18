import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I04Controller } from './i04.controller';
import { I04Service } from './i04.service';
import { I04Entity } from './i04.entity';

@Module({
  imports: [TypeOrmModule.forFeature([I04Entity])],
  controllers: [I04Controller],
  providers: [I04Service],
  exports: [I04Service],
})
export class I04Module {}
