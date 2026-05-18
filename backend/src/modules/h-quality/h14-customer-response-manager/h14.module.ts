import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { H14Controller } from './h14.controller';
import { H14Service } from './h14.service';
import { H14Entity } from './h14.entity';

@Module({
  imports: [TypeOrmModule.forFeature([H14Entity])],
  controllers: [H14Controller],
  providers: [H14Service],
  exports: [H14Service],
})
export class H14Module {}
