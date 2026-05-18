import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { L01Controller } from './l01.controller';
import { L01Service } from './l01.service';
import { L01Entity } from './l01.entity';

@Module({
  imports: [TypeOrmModule.forFeature([L01Entity])],
  controllers: [L01Controller],
  providers: [L01Service],
  exports: [L01Service],
})
export class L01Module {}
