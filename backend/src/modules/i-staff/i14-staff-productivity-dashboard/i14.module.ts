import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I14Controller } from './i14.controller';
import { I14Service } from './i14.service';
import { I14Entity } from './i14.entity';

@Module({
  imports: [TypeOrmModule.forFeature([I14Entity])],
  controllers: [I14Controller],
  providers: [I14Service],
  exports: [I14Service],
})
export class I14Module {}
