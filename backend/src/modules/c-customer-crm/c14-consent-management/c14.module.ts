import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { C14Controller } from './c14.controller';
import { C14Service } from './c14.service';
import { C14Entity } from './c14.entity';

@Module({
  imports: [TypeOrmModule.forFeature([C14Entity])],
  controllers: [C14Controller],
  providers: [C14Service],
  exports: [C14Service],
})
export class C14Module {}
