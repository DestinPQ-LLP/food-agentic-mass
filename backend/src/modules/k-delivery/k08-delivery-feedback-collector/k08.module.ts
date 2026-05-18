import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { K08Controller } from './k08.controller';
import { K08Service } from './k08.service';
import { K08Entity } from './k08.entity';

@Module({
  imports: [TypeOrmModule.forFeature([K08Entity])],
  controllers: [K08Controller],
  providers: [K08Service],
  exports: [K08Service],
})
export class K08Module {}
