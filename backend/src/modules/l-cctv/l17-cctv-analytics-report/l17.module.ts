import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { L17Controller } from './l17.controller';
import { L17Service } from './l17.service';
import { L17Entity } from './l17.entity';

@Module({
  imports: [TypeOrmModule.forFeature([L17Entity])],
  controllers: [L17Controller],
  providers: [L17Service],
  exports: [L17Service],
})
export class L17Module {}
