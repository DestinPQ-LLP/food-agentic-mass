import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { N09Controller } from './n09.controller';
import { N09Service } from './n09.service';
import { N09Entity } from './n09.entity';

@Module({
  imports: [TypeOrmModule.forFeature([N09Entity])],
  controllers: [N09Controller],
  providers: [N09Service],
  exports: [N09Service],
})
export class N09Module {}
