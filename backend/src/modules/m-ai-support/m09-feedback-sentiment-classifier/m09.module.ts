import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { M09Controller } from './m09.controller';
import { M09Service } from './m09.service';
import { M09Entity } from './m09.entity';

@Module({
  imports: [TypeOrmModule.forFeature([M09Entity])],
  controllers: [M09Controller],
  providers: [M09Service],
  exports: [M09Service],
})
export class M09Module {}
