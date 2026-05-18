import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { G13Controller } from './g13.controller';
import { G13Service } from './g13.service';
import { G13Entity } from './g13.entity';

@Module({
  imports: [TypeOrmModule.forFeature([G13Entity])],
  controllers: [G13Controller],
  providers: [G13Service],
  exports: [G13Service],
})
export class G13Module {}
