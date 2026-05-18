import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { A04Controller } from './a04.controller';
import { A04Service } from './a04.service';
import { A04Entity } from './a04.entity';

@Module({
  imports: [TypeOrmModule.forFeature([A04Entity])],
  controllers: [A04Controller],
  providers: [A04Service],
  exports: [A04Service],
})
export class A04Module {}
