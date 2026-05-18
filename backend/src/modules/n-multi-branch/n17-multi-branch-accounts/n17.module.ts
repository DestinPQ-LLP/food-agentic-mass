import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { N17Controller } from './n17.controller';
import { N17Service } from './n17.service';
import { N17Entity } from './n17.entity';

@Module({
  imports: [TypeOrmModule.forFeature([N17Entity])],
  controllers: [N17Controller],
  providers: [N17Service],
  exports: [N17Service],
})
export class N17Module {}
