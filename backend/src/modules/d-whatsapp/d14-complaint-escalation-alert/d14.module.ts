import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { D14Controller } from './d14.controller';
import { D14Service } from './d14.service';
import { D14Entity } from './d14.entity';

@Module({
  imports: [TypeOrmModule.forFeature([D14Entity])],
  controllers: [D14Controller],
  providers: [D14Service],
  exports: [D14Service],
})
export class D14Module {}
