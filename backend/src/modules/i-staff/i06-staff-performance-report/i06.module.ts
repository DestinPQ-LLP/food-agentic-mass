import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I06Controller } from './i06.controller';
import { I06Service } from './i06.service';
import { I06Entity } from './i06.entity';

@Module({
  imports: [TypeOrmModule.forFeature([I06Entity])],
  controllers: [I06Controller],
  providers: [I06Service],
  exports: [I06Service],
})
export class I06Module {}
