import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { H01Controller } from './h01.controller';
import { H01Service } from './h01.service';
import { H01Entity } from './h01.entity';

@Module({
  imports: [TypeOrmModule.forFeature([H01Entity])],
  controllers: [H01Controller],
  providers: [H01Service],
  exports: [H01Service],
})
export class H01Module {}
