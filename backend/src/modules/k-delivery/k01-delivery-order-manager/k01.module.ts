import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { K01Controller } from './k01.controller';
import { K01Service } from './k01.service';
import { K01Entity } from './k01.entity';

@Module({
  imports: [TypeOrmModule.forFeature([K01Entity])],
  controllers: [K01Controller],
  providers: [K01Service],
  exports: [K01Service],
})
export class K01Module {}
