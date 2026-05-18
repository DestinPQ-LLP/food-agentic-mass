import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { F09Controller } from './f09.controller';
import { F09Service } from './f09.service';
import { F09Entity } from './f09.entity';

@Module({
  imports: [TypeOrmModule.forFeature([F09Entity])],
  controllers: [F09Controller],
  providers: [F09Service],
  exports: [F09Service],
})
export class F09Module {}
