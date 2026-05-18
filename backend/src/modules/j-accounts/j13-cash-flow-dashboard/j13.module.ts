import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { J13Controller } from './j13.controller';
import { J13Service } from './j13.service';
import { J13Entity } from './j13.entity';

@Module({
  imports: [TypeOrmModule.forFeature([J13Entity])],
  controllers: [J13Controller],
  providers: [J13Service],
  exports: [J13Service],
})
export class J13Module {}
