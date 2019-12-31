import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleRepository } from './role.repository';
import { SharedModule } from '../shared/shared.module';
import { RoleSerive } from './role.service';
import { RoleControler } from './role.controler';

@Module({
  imports: [TypeOrmModule.forFeature([RoleRepository]), SharedModule],
  providers: [RoleSerive],
  controllers: [RoleControler],
})
export class RoleModule {}
