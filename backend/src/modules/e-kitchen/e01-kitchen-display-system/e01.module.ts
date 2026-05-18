import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { E01Controller } from './e01.controller';
import { E01Service } from './e01.service';
import { E01Entity } from './e01.entity';

@Module({
  imports: [TypeOrmModule.forFeature([E01Entity])],
  controllers: [E01Controller],
  providers: [E01Service],
  exports: [E01Service],
})
export class E01Module {}
