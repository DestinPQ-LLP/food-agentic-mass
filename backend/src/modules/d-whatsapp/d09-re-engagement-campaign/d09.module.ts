import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { D09Controller } from './d09.controller';
import { D09Service } from './d09.service';
import { D09Entity } from './d09.entity';

@Module({
  imports: [TypeOrmModule.forFeature([D09Entity])],
  controllers: [D09Controller],
  providers: [D09Service],
  exports: [D09Service],
})
export class D09Module {}
