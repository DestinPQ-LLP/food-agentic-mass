import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { H07Controller } from './h07.controller';
import { H07Service } from './h07.service';
import { H07Entity } from './h07.entity';

@Module({
  imports: [TypeOrmModule.forFeature([H07Entity])],
  controllers: [H07Controller],
  providers: [H07Service],
  exports: [H07Service],
})
export class H07Module {}
