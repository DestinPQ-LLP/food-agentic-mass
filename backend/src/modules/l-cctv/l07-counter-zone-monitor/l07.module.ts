import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { L07Controller } from './l07.controller';
import { L07Service } from './l07.service';
import { L07Entity } from './l07.entity';

@Module({
  imports: [TypeOrmModule.forFeature([L07Entity])],
  controllers: [L07Controller],
  providers: [L07Service],
  exports: [L07Service],
})
export class L07Module {}
