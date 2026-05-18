import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { J17Controller } from './j17.controller';
import { J17Service } from './j17.service';
import { J17Entity } from './j17.entity';

@Module({
  imports: [TypeOrmModule.forFeature([J17Entity])],
  controllers: [J17Controller],
  providers: [J17Service],
  exports: [J17Service],
})
export class J17Module {}
