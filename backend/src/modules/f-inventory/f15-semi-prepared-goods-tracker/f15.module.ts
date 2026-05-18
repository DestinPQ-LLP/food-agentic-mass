import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { F15Controller } from './f15.controller';
import { F15Service } from './f15.service';
import { F15Entity } from './f15.entity';

@Module({
  imports: [TypeOrmModule.forFeature([F15Entity])],
  controllers: [F15Controller],
  providers: [F15Service],
  exports: [F15Service],
})
export class F15Module {}
