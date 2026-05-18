import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { G15Controller } from './g15.controller';
import { G15Service } from './g15.service';
import { G15Entity } from './g15.entity';

@Module({
  imports: [TypeOrmModule.forFeature([G15Entity])],
  controllers: [G15Controller],
  providers: [G15Service],
  exports: [G15Service],
})
export class G15Module {}
