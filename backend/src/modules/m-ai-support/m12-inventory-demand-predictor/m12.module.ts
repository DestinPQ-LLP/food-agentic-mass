import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { M12Controller } from './m12.controller';
import { M12Service } from './m12.service';
import { M12Entity } from './m12.entity';

@Module({
  imports: [TypeOrmModule.forFeature([M12Entity])],
  controllers: [M12Controller],
  providers: [M12Service],
  exports: [M12Service],
})
export class M12Module {}
