import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { K17Controller } from './k17.controller';
import { K17Service } from './k17.service';
import { K17Entity } from './k17.entity';

@Module({
  imports: [TypeOrmModule.forFeature([K17Entity])],
  controllers: [K17Controller],
  providers: [K17Service],
  exports: [K17Service],
})
export class K17Module {}
