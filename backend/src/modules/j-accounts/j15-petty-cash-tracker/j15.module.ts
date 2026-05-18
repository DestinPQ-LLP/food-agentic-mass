import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { J15Controller } from './j15.controller';
import { J15Service } from './j15.service';
import { J15Entity } from './j15.entity';

@Module({
  imports: [TypeOrmModule.forFeature([J15Entity])],
  controllers: [J15Controller],
  providers: [J15Service],
  exports: [J15Service],
})
export class J15Module {}
