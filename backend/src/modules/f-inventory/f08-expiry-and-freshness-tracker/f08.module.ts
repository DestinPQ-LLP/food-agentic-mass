import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { F08Controller } from './f08.controller';
import { F08Service } from './f08.service';
import { F08Entity } from './f08.entity';

@Module({
  imports: [TypeOrmModule.forFeature([F08Entity])],
  controllers: [F08Controller],
  providers: [F08Service],
  exports: [F08Service],
})
export class F08Module {}
