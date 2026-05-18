import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { F01Controller } from './f01.controller';
import { F01Service } from './f01.service';
import { F01Entity } from './f01.entity';

@Module({
  imports: [TypeOrmModule.forFeature([F01Entity])],
  controllers: [F01Controller],
  providers: [F01Service],
  exports: [F01Service],
})
export class F01Module {}
