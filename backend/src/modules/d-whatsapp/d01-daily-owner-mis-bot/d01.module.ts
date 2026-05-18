import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { D01Controller } from './d01.controller';
import { D01Service } from './d01.service';
import { D01Entity } from './d01.entity';

@Module({
  imports: [TypeOrmModule.forFeature([D01Entity])],
  controllers: [D01Controller],
  providers: [D01Service],
  exports: [D01Service],
})
export class D01Module {}
