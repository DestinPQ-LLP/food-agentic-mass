import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I01Controller } from './i01.controller';
import { I01Service } from './i01.service';
import { I01Entity } from './i01.entity';

@Module({
  imports: [TypeOrmModule.forFeature([I01Entity])],
  controllers: [I01Controller],
  providers: [I01Service],
  exports: [I01Service],
})
export class I01Module {}
