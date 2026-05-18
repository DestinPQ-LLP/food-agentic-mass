import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { A09Controller } from './a09.controller';
import { A09Service } from './a09.service';
import { A09Entity } from './a09.entity';

@Module({
  imports: [TypeOrmModule.forFeature([A09Entity])],
  controllers: [A09Controller],
  providers: [A09Service],
  exports: [A09Service],
})
export class A09Module {}
