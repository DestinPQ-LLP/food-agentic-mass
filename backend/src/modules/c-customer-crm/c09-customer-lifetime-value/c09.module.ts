import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { C09Controller } from './c09.controller';
import { C09Service } from './c09.service';
import { C09Entity } from './c09.entity';

@Module({
  imports: [TypeOrmModule.forFeature([C09Entity])],
  controllers: [C09Controller],
  providers: [C09Service],
  exports: [C09Service],
})
export class C09Module {}
