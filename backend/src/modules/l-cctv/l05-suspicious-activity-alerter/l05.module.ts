import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { L05Controller } from './l05.controller';
import { L05Service } from './l05.service';
import { L05Entity } from './l05.entity';

@Module({
  imports: [TypeOrmModule.forFeature([L05Entity])],
  controllers: [L05Controller],
  providers: [L05Service],
  exports: [L05Service],
})
export class L05Module {}
