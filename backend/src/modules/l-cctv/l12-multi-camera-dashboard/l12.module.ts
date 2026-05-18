import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { L12Controller } from './l12.controller';
import { L12Service } from './l12.service';
import { L12Entity } from './l12.entity';

@Module({
  imports: [TypeOrmModule.forFeature([L12Entity])],
  controllers: [L12Controller],
  providers: [L12Service],
  exports: [L12Service],
})
export class L12Module {}
