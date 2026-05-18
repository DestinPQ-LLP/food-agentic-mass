import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { M06Controller } from './m06.controller';
import { M06Service } from './m06.service';
import { M06Entity } from './m06.entity';

@Module({
  imports: [TypeOrmModule.forFeature([M06Entity])],
  controllers: [M06Controller],
  providers: [M06Service],
  exports: [M06Service],
})
export class M06Module {}
