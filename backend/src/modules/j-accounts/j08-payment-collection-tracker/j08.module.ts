import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { J08Controller } from './j08.controller';
import { J08Service } from './j08.service';
import { J08Entity } from './j08.entity';

@Module({
  imports: [TypeOrmModule.forFeature([J08Entity])],
  controllers: [J08Controller],
  providers: [J08Service],
  exports: [J08Service],
})
export class J08Module {}
