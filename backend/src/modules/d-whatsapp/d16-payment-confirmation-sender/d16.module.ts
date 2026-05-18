import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { D16Controller } from './d16.controller';
import { D16Service } from './d16.service';
import { D16Entity } from './d16.entity';

@Module({
  imports: [TypeOrmModule.forFeature([D16Entity])],
  controllers: [D16Controller],
  providers: [D16Service],
  exports: [D16Service],
})
export class D16Module {}
