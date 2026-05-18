import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { N06Controller } from './n06.controller';
import { N06Service } from './n06.service';
import { N06Entity } from './n06.entity';

@Module({
  imports: [TypeOrmModule.forFeature([N06Entity])],
  controllers: [N06Controller],
  providers: [N06Service],
  exports: [N06Service],
})
export class N06Module {}
