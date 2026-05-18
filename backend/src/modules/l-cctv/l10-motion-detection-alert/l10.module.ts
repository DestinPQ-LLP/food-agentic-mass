import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { L10Controller } from './l10.controller';
import { L10Service } from './l10.service';
import { L10Entity } from './l10.entity';

@Module({
  imports: [TypeOrmModule.forFeature([L10Entity])],
  controllers: [L10Controller],
  providers: [L10Service],
  exports: [L10Service],
})
export class L10Module {}
