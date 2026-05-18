import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { G11Controller } from './g11.controller';
import { G11Service } from './g11.service';
import { G11Entity } from './g11.entity';

@Module({
  imports: [TypeOrmModule.forFeature([G11Entity])],
  controllers: [G11Controller],
  providers: [G11Service],
  exports: [G11Service],
})
export class G11Module {}
