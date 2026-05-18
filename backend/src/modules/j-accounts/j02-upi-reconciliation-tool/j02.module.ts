import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { J02Controller } from './j02.controller';
import { J02Service } from './j02.service';
import { J02Entity } from './j02.entity';

@Module({
  imports: [TypeOrmModule.forFeature([J02Entity])],
  controllers: [J02Controller],
  providers: [J02Service],
  exports: [J02Service],
})
export class J02Module {}
