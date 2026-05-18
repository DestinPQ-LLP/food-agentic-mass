import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { B18Controller } from './b18.controller';
import { B18Service } from './b18.service';
import { B18Entity } from './b18.entity';

@Module({
  imports: [TypeOrmModule.forFeature([B18Entity])],
  controllers: [B18Controller],
  providers: [B18Service],
  exports: [B18Service],
})
export class B18Module {}
