import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { N07Controller } from './n07.controller';
import { N07Service } from './n07.service';
import { N07Entity } from './n07.entity';

@Module({
  imports: [TypeOrmModule.forFeature([N07Entity])],
  controllers: [N07Controller],
  providers: [N07Service],
  exports: [N07Service],
})
export class N07Module {}
