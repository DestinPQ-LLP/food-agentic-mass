import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I16Controller } from './i16.controller';
import { I16Service } from './i16.service';
import { I16Entity } from './i16.entity';

@Module({
  imports: [TypeOrmModule.forFeature([I16Entity])],
  controllers: [I16Controller],
  providers: [I16Service],
  exports: [I16Service],
})
export class I16Module {}
