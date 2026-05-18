import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { J14Controller } from './j14.controller';
import { J14Service } from './j14.service';
import { J14Entity } from './j14.entity';

@Module({
  imports: [TypeOrmModule.forFeature([J14Entity])],
  controllers: [J14Controller],
  providers: [J14Service],
  exports: [J14Service],
})
export class J14Module {}
