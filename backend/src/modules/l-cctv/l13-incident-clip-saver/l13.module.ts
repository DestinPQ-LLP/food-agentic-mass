import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { L13Controller } from './l13.controller';
import { L13Service } from './l13.service';
import { L13Entity } from './l13.entity';

@Module({
  imports: [TypeOrmModule.forFeature([L13Entity])],
  controllers: [L13Controller],
  providers: [L13Service],
  exports: [L13Service],
})
export class L13Module {}
