import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { H16Controller } from './h16.controller';
import { H16Service } from './h16.service';
import { H16Entity } from './h16.entity';

@Module({
  imports: [TypeOrmModule.forFeature([H16Entity])],
  controllers: [H16Controller],
  providers: [H16Service],
  exports: [H16Service],
})
export class H16Module {}
