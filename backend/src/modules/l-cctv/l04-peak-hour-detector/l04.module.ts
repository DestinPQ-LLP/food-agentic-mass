import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { L04Controller } from './l04.controller';
import { L04Service } from './l04.service';
import { L04Entity } from './l04.entity';

@Module({
  imports: [TypeOrmModule.forFeature([L04Entity])],
  controllers: [L04Controller],
  providers: [L04Service],
  exports: [L04Service],
})
export class L04Module {}
