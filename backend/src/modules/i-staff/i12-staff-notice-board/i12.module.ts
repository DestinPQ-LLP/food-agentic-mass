import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I12Controller } from './i12.controller';
import { I12Service } from './i12.service';
import { I12Entity } from './i12.entity';

@Module({
  imports: [TypeOrmModule.forFeature([I12Entity])],
  controllers: [I12Controller],
  providers: [I12Service],
  exports: [I12Service],
})
export class I12Module {}
