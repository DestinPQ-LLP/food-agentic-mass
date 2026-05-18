import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { A08Controller } from './a08.controller';
import { A08Service } from './a08.service';
import { A08Entity } from './a08.entity';

@Module({
  imports: [TypeOrmModule.forFeature([A08Entity])],
  controllers: [A08Controller],
  providers: [A08Service],
  exports: [A08Service],
})
export class A08Module {}
