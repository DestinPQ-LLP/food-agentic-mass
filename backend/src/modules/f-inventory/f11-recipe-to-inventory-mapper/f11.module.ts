import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { F11Controller } from './f11.controller';
import { F11Service } from './f11.service';
import { F11Entity } from './f11.entity';

@Module({
  imports: [TypeOrmModule.forFeature([F11Entity])],
  controllers: [F11Controller],
  providers: [F11Service],
  exports: [F11Service],
})
export class F11Module {}
