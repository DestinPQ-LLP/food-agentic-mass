import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { H06Controller } from './h06.controller';
import { H06Service } from './h06.service';
import { H06Entity } from './h06.entity';

@Module({
  imports: [TypeOrmModule.forFeature([H06Entity])],
  controllers: [H06Controller],
  providers: [H06Service],
  exports: [H06Service],
})
export class H06Module {}
