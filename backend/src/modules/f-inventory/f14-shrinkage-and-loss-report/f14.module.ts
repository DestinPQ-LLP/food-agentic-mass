import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { F14Controller } from './f14.controller';
import { F14Service } from './f14.service';
import { F14Entity } from './f14.entity';

@Module({
  imports: [TypeOrmModule.forFeature([F14Entity])],
  controllers: [F14Controller],
  providers: [F14Service],
  exports: [F14Service],
})
export class F14Module {}
