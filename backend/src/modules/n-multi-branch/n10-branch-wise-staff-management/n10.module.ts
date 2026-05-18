import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { N10Controller } from './n10.controller';
import { N10Service } from './n10.service';
import { N10Entity } from './n10.entity';

@Module({
  imports: [TypeOrmModule.forFeature([N10Entity])],
  controllers: [N10Controller],
  providers: [N10Service],
  exports: [N10Service],
})
export class N10Module {}
