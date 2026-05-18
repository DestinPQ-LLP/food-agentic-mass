import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { E18Controller } from './e18.controller';
import { E18Service } from './e18.service';
import { E18Entity } from './e18.entity';

@Module({
  imports: [TypeOrmModule.forFeature([E18Entity])],
  controllers: [E18Controller],
  providers: [E18Service],
  exports: [E18Service],
})
export class E18Module {}
