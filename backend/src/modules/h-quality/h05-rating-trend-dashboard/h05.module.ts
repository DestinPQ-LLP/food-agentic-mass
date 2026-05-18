import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { H05Controller } from './h05.controller';
import { H05Service } from './h05.service';
import { H05Entity } from './h05.entity';

@Module({
  imports: [TypeOrmModule.forFeature([H05Entity])],
  controllers: [H05Controller],
  providers: [H05Service],
  exports: [H05Service],
})
export class H05Module {}
