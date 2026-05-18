import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { E10Controller } from './e10.controller';
import { E10Service } from './e10.service';
import { E10Entity } from './e10.entity';

@Module({
  imports: [TypeOrmModule.forFeature([E10Entity])],
  controllers: [E10Controller],
  providers: [E10Service],
  exports: [E10Service],
})
export class E10Module {}
