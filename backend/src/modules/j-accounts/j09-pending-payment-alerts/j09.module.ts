import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { J09Controller } from './j09.controller';
import { J09Service } from './j09.service';
import { J09Entity } from './j09.entity';

@Module({
  imports: [TypeOrmModule.forFeature([J09Entity])],
  controllers: [J09Controller],
  providers: [J09Service],
  exports: [J09Service],
})
export class J09Module {}
