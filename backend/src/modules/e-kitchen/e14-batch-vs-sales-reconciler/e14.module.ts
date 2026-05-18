import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { E14Controller } from './e14.controller';
import { E14Service } from './e14.service';
import { E14Entity } from './e14.entity';

@Module({
  imports: [TypeOrmModule.forFeature([E14Entity])],
  controllers: [E14Controller],
  providers: [E14Service],
  exports: [E14Service],
})
export class E14Module {}
