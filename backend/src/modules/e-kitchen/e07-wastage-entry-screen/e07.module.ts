import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { E07Controller } from './e07.controller';
import { E07Service } from './e07.service';
import { E07Entity } from './e07.entity';

@Module({
  imports: [TypeOrmModule.forFeature([E07Entity])],
  controllers: [E07Controller],
  providers: [E07Service],
  exports: [E07Service],
})
export class E07Module {}
