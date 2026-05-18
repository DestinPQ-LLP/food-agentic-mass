import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { K07Controller } from './k07.controller';
import { K07Service } from './k07.service';
import { K07Entity } from './k07.entity';

@Module({
  imports: [TypeOrmModule.forFeature([K07Entity])],
  controllers: [K07Controller],
  providers: [K07Service],
  exports: [K07Service],
})
export class K07Module {}
