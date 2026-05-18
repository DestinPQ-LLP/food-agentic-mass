import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { J06Controller } from './j06.controller';
import { J06Service } from './j06.service';
import { J06Entity } from './j06.entity';

@Module({
  imports: [TypeOrmModule.forFeature([J06Entity])],
  controllers: [J06Controller],
  providers: [J06Service],
  exports: [J06Service],
})
export class J06Module {}
