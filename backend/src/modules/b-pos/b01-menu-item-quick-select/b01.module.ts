import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { B01Controller } from './b01.controller';
import { B01Service } from './b01.service';
import { B01Entity } from './b01.entity';

@Module({
  imports: [TypeOrmModule.forFeature([B01Entity])],
  controllers: [B01Controller],
  providers: [B01Service],
  exports: [B01Service],
})
export class B01Module {}
