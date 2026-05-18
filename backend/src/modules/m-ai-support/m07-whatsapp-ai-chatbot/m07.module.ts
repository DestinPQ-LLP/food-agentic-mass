import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { M07Controller } from './m07.controller';
import { M07Service } from './m07.service';
import { M07Entity } from './m07.entity';

@Module({
  imports: [TypeOrmModule.forFeature([M07Entity])],
  controllers: [M07Controller],
  providers: [M07Service],
  exports: [M07Service],
})
export class M07Module {}
