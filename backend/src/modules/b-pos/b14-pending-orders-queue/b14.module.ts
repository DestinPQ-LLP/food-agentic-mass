import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { B14Controller } from './b14.controller';
import { B14Service } from './b14.service';
import { B14Entity } from './b14.entity';

@Module({
  imports: [TypeOrmModule.forFeature([B14Entity])],
  controllers: [B14Controller],
  providers: [B14Service],
  exports: [B14Service],
})
export class B14Module {}
