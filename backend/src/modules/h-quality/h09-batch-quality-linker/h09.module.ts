import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { H09Controller } from './h09.controller';
import { H09Service } from './h09.service';
import { H09Entity } from './h09.entity';

@Module({
  imports: [TypeOrmModule.forFeature([H09Entity])],
  controllers: [H09Controller],
  providers: [H09Service],
  exports: [H09Service],
})
export class H09Module {}
