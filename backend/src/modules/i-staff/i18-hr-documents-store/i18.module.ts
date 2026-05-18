import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I18Controller } from './i18.controller';
import { I18Service } from './i18.service';
import { I18Entity } from './i18.entity';

@Module({
  imports: [TypeOrmModule.forFeature([I18Entity])],
  controllers: [I18Controller],
  providers: [I18Service],
  exports: [I18Service],
})
export class I18Module {}
