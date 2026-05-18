import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { F05Controller } from './f05.controller';
import { F05Service } from './f05.service';
import { F05Entity } from './f05.entity';

@Module({
  imports: [TypeOrmModule.forFeature([F05Entity])],
  controllers: [F05Controller],
  providers: [F05Service],
  exports: [F05Service],
})
export class F05Module {}
