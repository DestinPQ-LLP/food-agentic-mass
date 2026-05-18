import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { N14Controller } from './n14.controller';
import { N14Service } from './n14.service';
import { N14Entity } from './n14.entity';

@Module({
  imports: [TypeOrmModule.forFeature([N14Entity])],
  controllers: [N14Controller],
  providers: [N14Service],
  exports: [N14Service],
})
export class N14Module {}
