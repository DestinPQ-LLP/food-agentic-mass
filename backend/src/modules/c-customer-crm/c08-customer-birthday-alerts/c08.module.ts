import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { C08Controller } from './c08.controller';
import { C08Service } from './c08.service';
import { C08Entity } from './c08.entity';

@Module({
  imports: [TypeOrmModule.forFeature([C08Entity])],
  controllers: [C08Controller],
  providers: [C08Service],
  exports: [C08Service],
})
export class C08Module {}
