import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { B16Controller } from './b16.controller';
import { B16Service } from './b16.service';
import { B16Entity } from './b16.entity';

@Module({
  imports: [TypeOrmModule.forFeature([B16Entity])],
  controllers: [B16Controller],
  providers: [B16Service],
  exports: [B16Service],
})
export class B16Module {}
