import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { J10Controller } from './j10.controller';
import { J10Service } from './j10.service';
import { J10Entity } from './j10.entity';

@Module({
  imports: [TypeOrmModule.forFeature([J10Entity])],
  controllers: [J10Controller],
  providers: [J10Service],
  exports: [J10Service],
})
export class J10Module {}
