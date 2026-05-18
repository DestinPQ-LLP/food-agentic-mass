import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { D13Controller } from './d13.controller';
import { D13Service } from './d13.service';
import { D13Entity } from './d13.entity';

@Module({
  imports: [TypeOrmModule.forFeature([D13Entity])],
  controllers: [D13Controller],
  providers: [D13Service],
  exports: [D13Service],
})
export class D13Module {}
