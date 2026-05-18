import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I05Controller } from './i05.controller';
import { I05Service } from './i05.service';
import { I05Entity } from './i05.entity';

@Module({
  imports: [TypeOrmModule.forFeature([I05Entity])],
  controllers: [I05Controller],
  providers: [I05Service],
  exports: [I05Service],
})
export class I05Module {}
