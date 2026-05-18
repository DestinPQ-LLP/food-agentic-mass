import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { E02Controller } from './e02.controller';
import { E02Service } from './e02.service';
import { E02Entity } from './e02.entity';

@Module({
  imports: [TypeOrmModule.forFeature([E02Entity])],
  controllers: [E02Controller],
  providers: [E02Service],
  exports: [E02Service],
})
export class E02Module {}
