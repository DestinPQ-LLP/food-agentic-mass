import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { J03Controller } from './j03.controller';
import { J03Service } from './j03.service';
import { J03Entity } from './j03.entity';

@Module({
  imports: [TypeOrmModule.forFeature([J03Entity])],
  controllers: [J03Controller],
  providers: [J03Service],
  exports: [J03Service],
})
export class J03Module {}
