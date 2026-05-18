import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { K09Controller } from './k09.controller';
import { K09Service } from './k09.service';
import { K09Entity } from './k09.entity';

@Module({
  imports: [TypeOrmModule.forFeature([K09Entity])],
  controllers: [K09Controller],
  providers: [K09Service],
  exports: [K09Service],
})
export class K09Module {}
