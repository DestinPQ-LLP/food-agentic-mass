import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { N01Controller } from './n01.controller';
import { N01Service } from './n01.service';
import { N01Entity } from './n01.entity';

@Module({
  imports: [TypeOrmModule.forFeature([N01Entity])],
  controllers: [N01Controller],
  providers: [N01Service],
  exports: [N01Service],
})
export class N01Module {}
