import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { C01Controller } from './c01.controller';
import { C01Service } from './c01.service';
import { C01Entity } from './c01.entity';

@Module({
  imports: [TypeOrmModule.forFeature([C01Entity])],
  controllers: [C01Controller],
  providers: [C01Service],
  exports: [C01Service],
})
export class C01Module {}
