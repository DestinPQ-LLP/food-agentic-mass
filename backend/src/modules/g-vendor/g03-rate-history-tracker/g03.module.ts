import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { G03Controller } from './g03.controller';
import { G03Service } from './g03.service';
import { G03Entity } from './g03.entity';

@Module({
  imports: [TypeOrmModule.forFeature([G03Entity])],
  controllers: [G03Controller],
  providers: [G03Service],
  exports: [G03Service],
})
export class G03Module {}
