import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { K02Controller } from './k02.controller';
import { K02Service } from './k02.service';
import { K02Entity } from './k02.entity';

@Module({
  imports: [TypeOrmModule.forFeature([K02Entity])],
  controllers: [K02Controller],
  providers: [K02Service],
  exports: [K02Service],
})
export class K02Module {}
