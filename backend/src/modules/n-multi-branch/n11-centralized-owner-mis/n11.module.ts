import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { N11Controller } from './n11.controller';
import { N11Service } from './n11.service';
import { N11Entity } from './n11.entity';

@Module({
  imports: [TypeOrmModule.forFeature([N11Entity])],
  controllers: [N11Controller],
  providers: [N11Service],
  exports: [N11Service],
})
export class N11Module {}
