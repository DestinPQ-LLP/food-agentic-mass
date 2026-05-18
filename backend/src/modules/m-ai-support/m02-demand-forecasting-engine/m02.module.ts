import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { M02Controller } from './m02.controller';
import { M02Service } from './m02.service';
import { M02Entity } from './m02.entity';

@Module({
  imports: [TypeOrmModule.forFeature([M02Entity])],
  controllers: [M02Controller],
  providers: [M02Service],
  exports: [M02Service],
})
export class M02Module {}
