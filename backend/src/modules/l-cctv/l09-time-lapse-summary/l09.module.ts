import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { L09Controller } from './l09.controller';
import { L09Service } from './l09.service';
import { L09Entity } from './l09.entity';

@Module({
  imports: [TypeOrmModule.forFeature([L09Entity])],
  controllers: [L09Controller],
  providers: [L09Service],
  exports: [L09Service],
})
export class L09Module {}
