import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { F17Controller } from './f17.controller';
import { F17Service } from './f17.service';
import { F17Entity } from './f17.entity';

@Module({
  imports: [TypeOrmModule.forFeature([F17Entity])],
  controllers: [F17Controller],
  providers: [F17Service],
  exports: [F17Service],
})
export class F17Module {}
