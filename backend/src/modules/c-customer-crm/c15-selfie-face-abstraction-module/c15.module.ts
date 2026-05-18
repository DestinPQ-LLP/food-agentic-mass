import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { C15Controller } from './c15.controller';
import { C15Service } from './c15.service';
import { C15Entity } from './c15.entity';

@Module({
  imports: [TypeOrmModule.forFeature([C15Entity])],
  controllers: [C15Controller],
  providers: [C15Service],
  exports: [C15Service],
})
export class C15Module {}
