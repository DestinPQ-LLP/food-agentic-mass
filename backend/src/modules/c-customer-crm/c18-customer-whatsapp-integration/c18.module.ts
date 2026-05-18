import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { C18Controller } from './c18.controller';
import { C18Service } from './c18.service';
import { C18Entity } from './c18.entity';

@Module({
  imports: [TypeOrmModule.forFeature([C18Entity])],
  controllers: [C18Controller],
  providers: [C18Service],
  exports: [C18Service],
})
export class C18Module {}
