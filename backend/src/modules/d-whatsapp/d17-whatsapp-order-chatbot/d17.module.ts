import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { D17Controller } from './d17.controller';
import { D17Service } from './d17.service';
import { D17Entity } from './d17.entity';

@Module({
  imports: [TypeOrmModule.forFeature([D17Entity])],
  controllers: [D17Controller],
  providers: [D17Service],
  exports: [D17Service],
})
export class D17Module {}
