import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { D07Controller } from './d07.controller';
import { D07Service } from './d07.service';
import { D07Entity } from './d07.entity';

@Module({
  imports: [TypeOrmModule.forFeature([D07Entity])],
  controllers: [D07Controller],
  providers: [D07Service],
  exports: [D07Service],
})
export class D07Module {}
