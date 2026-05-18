import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { H12Controller } from './h12.controller';
import { H12Service } from './h12.service';
import { H12Entity } from './h12.entity';

@Module({
  imports: [TypeOrmModule.forFeature([H12Entity])],
  controllers: [H12Controller],
  providers: [H12Service],
  exports: [H12Service],
})
export class H12Module {}
