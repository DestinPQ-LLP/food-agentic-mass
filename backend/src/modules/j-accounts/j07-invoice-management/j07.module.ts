import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { J07Controller } from './j07.controller';
import { J07Service } from './j07.service';
import { J07Entity } from './j07.entity';

@Module({
  imports: [TypeOrmModule.forFeature([J07Entity])],
  controllers: [J07Controller],
  providers: [J07Service],
  exports: [J07Service],
})
export class J07Module {}
