import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { J01Controller } from './j01.controller';
import { J01Service } from './j01.service';
import { J01Entity } from './j01.entity';

@Module({
  imports: [TypeOrmModule.forFeature([J01Entity])],
  controllers: [J01Controller],
  providers: [J01Service],
  exports: [J01Service],
})
export class J01Module {}
