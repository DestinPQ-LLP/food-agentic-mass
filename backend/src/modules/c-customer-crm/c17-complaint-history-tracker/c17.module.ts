import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { C17Controller } from './c17.controller';
import { C17Service } from './c17.service';
import { C17Entity } from './c17.entity';

@Module({
  imports: [TypeOrmModule.forFeature([C17Entity])],
  controllers: [C17Controller],
  providers: [C17Service],
  exports: [C17Service],
})
export class C17Module {}
