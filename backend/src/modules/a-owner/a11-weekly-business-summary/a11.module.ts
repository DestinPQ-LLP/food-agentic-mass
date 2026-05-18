import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { A11Controller } from './a11.controller';
import { A11Service } from './a11.service';
import { A11Entity } from './a11.entity';

@Module({
  imports: [TypeOrmModule.forFeature([A11Entity])],
  controllers: [A11Controller],
  providers: [A11Service],
  exports: [A11Service],
})
export class A11Module {}
