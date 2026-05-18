import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { L11Controller } from './l11.controller';
import { L11Service } from './l11.service';
import { L11Entity } from './l11.entity';

@Module({
  imports: [TypeOrmModule.forFeature([L11Entity])],
  controllers: [L11Controller],
  providers: [L11Service],
  exports: [L11Service],
})
export class L11Module {}
