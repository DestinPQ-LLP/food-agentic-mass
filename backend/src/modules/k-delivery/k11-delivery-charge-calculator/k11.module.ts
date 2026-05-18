import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { K11Controller } from './k11.controller';
import { K11Service } from './k11.service';
import { K11Entity } from './k11.entity';

@Module({
  imports: [TypeOrmModule.forFeature([K11Entity])],
  controllers: [K11Controller],
  providers: [K11Service],
  exports: [K11Service],
})
export class K11Module {}
