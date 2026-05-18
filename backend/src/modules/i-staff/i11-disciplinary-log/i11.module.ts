import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I11Controller } from './i11.controller';
import { I11Service } from './i11.service';
import { I11Entity } from './i11.entity';

@Module({
  imports: [TypeOrmModule.forFeature([I11Entity])],
  controllers: [I11Controller],
  providers: [I11Service],
  exports: [I11Service],
})
export class I11Module {}
