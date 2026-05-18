import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { M08Controller } from './m08.controller';
import { M08Service } from './m08.service';
import { M08Entity } from './m08.entity';

@Module({
  imports: [TypeOrmModule.forFeature([M08Entity])],
  controllers: [M08Controller],
  providers: [M08Service],
  exports: [M08Service],
})
export class M08Module {}
