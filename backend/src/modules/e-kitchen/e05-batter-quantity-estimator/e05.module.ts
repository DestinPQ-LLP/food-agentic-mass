import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { E05Controller } from './e05.controller';
import { E05Service } from './e05.service';
import { E05Entity } from './e05.entity';

@Module({
  imports: [TypeOrmModule.forFeature([E05Entity])],
  controllers: [E05Controller],
  providers: [E05Service],
  exports: [E05Service],
})
export class E05Module {}
