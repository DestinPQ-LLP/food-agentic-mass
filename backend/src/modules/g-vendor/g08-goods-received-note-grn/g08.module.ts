import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { G08Controller } from './g08.controller';
import { G08Service } from './g08.service';
import { G08Entity } from './g08.entity';

@Module({
  imports: [TypeOrmModule.forFeature([G08Entity])],
  controllers: [G08Controller],
  providers: [G08Service],
  exports: [G08Service],
})
export class G08Module {}
