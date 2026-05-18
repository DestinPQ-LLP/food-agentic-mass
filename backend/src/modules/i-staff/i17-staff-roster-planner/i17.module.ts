import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I17Controller } from './i17.controller';
import { I17Service } from './i17.service';
import { I17Entity } from './i17.entity';

@Module({
  imports: [TypeOrmModule.forFeature([I17Entity])],
  controllers: [I17Controller],
  providers: [I17Service],
  exports: [I17Service],
})
export class I17Module {}
