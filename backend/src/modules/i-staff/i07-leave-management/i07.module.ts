import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I07Controller } from './i07.controller';
import { I07Service } from './i07.service';
import { I07Entity } from './i07.entity';

@Module({
  imports: [TypeOrmModule.forFeature([I07Entity])],
  controllers: [I07Controller],
  providers: [I07Service],
  exports: [I07Service],
})
export class I07Module {}
