import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { L08Controller } from './l08.controller';
import { L08Service } from './l08.service';
import { L08Entity } from './l08.entity';

@Module({
  imports: [TypeOrmModule.forFeature([L08Entity])],
  controllers: [L08Controller],
  providers: [L08Service],
  exports: [L08Service],
})
export class L08Module {}
