import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { H10Controller } from './h10.controller';
import { H10Service } from './h10.service';
import { H10Entity } from './h10.entity';

@Module({
  imports: [TypeOrmModule.forFeature([H10Entity])],
  controllers: [H10Controller],
  providers: [H10Service],
  exports: [H10Service],
})
export class H10Module {}
