import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { G07Controller } from './g07.controller';
import { G07Service } from './g07.service';
import { G07Entity } from './g07.entity';

@Module({
  imports: [TypeOrmModule.forFeature([G07Entity])],
  controllers: [G07Controller],
  providers: [G07Service],
  exports: [G07Service],
})
export class G07Module {}
