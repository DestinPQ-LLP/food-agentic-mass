import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { G14Controller } from './g14.controller';
import { G14Service } from './g14.service';
import { G14Entity } from './g14.entity';

@Module({
  imports: [TypeOrmModule.forFeature([G14Entity])],
  controllers: [G14Controller],
  providers: [G14Service],
  exports: [G14Service],
})
export class G14Module {}
