import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { E11Controller } from './e11.controller';
import { E11Service } from './e11.service';
import { E11Entity } from './e11.entity';

@Module({
  imports: [TypeOrmModule.forFeature([E11Entity])],
  controllers: [E11Controller],
  providers: [E11Service],
  exports: [E11Service],
})
export class E11Module {}
