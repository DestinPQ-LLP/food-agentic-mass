import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I10Controller } from './i10.controller';
import { I10Service } from './i10.service';
import { I10Entity } from './i10.entity';

@Module({
  imports: [TypeOrmModule.forFeature([I10Entity])],
  controllers: [I10Controller],
  providers: [I10Service],
  exports: [I10Service],
})
export class I10Module {}
