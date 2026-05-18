import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { D08Controller } from './d08.controller';
import { D08Service } from './d08.service';
import { D08Entity } from './d08.entity';

@Module({
  imports: [TypeOrmModule.forFeature([D08Entity])],
  controllers: [D08Controller],
  providers: [D08Service],
  exports: [D08Service],
})
export class D08Module {}
