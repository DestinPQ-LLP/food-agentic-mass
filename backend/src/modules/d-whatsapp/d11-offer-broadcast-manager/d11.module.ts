import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { D11Controller } from './d11.controller';
import { D11Service } from './d11.service';
import { D11Entity } from './d11.entity';

@Module({
  imports: [TypeOrmModule.forFeature([D11Entity])],
  controllers: [D11Controller],
  providers: [D11Service],
  exports: [D11Service],
})
export class D11Module {}
