import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { M17Controller } from './m17.controller';
import { M17Service } from './m17.service';
import { M17Entity } from './m17.entity';

@Module({
  imports: [TypeOrmModule.forFeature([M17Entity])],
  controllers: [M17Controller],
  providers: [M17Service],
  exports: [M17Service],
})
export class M17Module {}
