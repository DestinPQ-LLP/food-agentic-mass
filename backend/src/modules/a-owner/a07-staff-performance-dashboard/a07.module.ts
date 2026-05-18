import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { A07Controller } from './a07.controller';
import { A07Service } from './a07.service';
import { A07Entity } from './a07.entity';

@Module({
  imports: [TypeOrmModule.forFeature([A07Entity])],
  controllers: [A07Controller],
  providers: [A07Service],
  exports: [A07Service],
})
export class A07Module {}
