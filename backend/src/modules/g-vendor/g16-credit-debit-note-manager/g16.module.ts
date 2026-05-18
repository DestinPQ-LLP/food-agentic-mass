import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { G16Controller } from './g16.controller';
import { G16Service } from './g16.service';
import { G16Entity } from './g16.entity';

@Module({
  imports: [TypeOrmModule.forFeature([G16Entity])],
  controllers: [G16Controller],
  providers: [G16Service],
  exports: [G16Service],
})
export class G16Module {}
