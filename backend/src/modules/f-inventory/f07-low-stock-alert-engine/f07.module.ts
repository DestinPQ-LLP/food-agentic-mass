import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { F07Controller } from './f07.controller';
import { F07Service } from './f07.service';
import { F07Entity } from './f07.entity';

@Module({
  imports: [TypeOrmModule.forFeature([F07Entity])],
  controllers: [F07Controller],
  providers: [F07Service],
  exports: [F07Service],
})
export class F07Module {}
