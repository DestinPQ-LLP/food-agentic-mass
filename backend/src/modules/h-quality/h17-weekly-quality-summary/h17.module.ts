import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { H17Controller } from './h17.controller';
import { H17Service } from './h17.service';
import { H17Entity } from './h17.entity';

@Module({
  imports: [TypeOrmModule.forFeature([H17Entity])],
  controllers: [H17Controller],
  providers: [H17Service],
  exports: [H17Service],
})
export class H17Module {}
