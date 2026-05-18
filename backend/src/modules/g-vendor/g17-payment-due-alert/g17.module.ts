import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { G17Controller } from './g17.controller';
import { G17Service } from './g17.service';
import { G17Entity } from './g17.entity';

@Module({
  imports: [TypeOrmModule.forFeature([G17Entity])],
  controllers: [G17Controller],
  providers: [G17Service],
  exports: [G17Service],
})
export class G17Module {}
