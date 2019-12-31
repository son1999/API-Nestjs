import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { RoleSerive } from './role.service';
import { RoleEntity } from './role.entity';
import { ancestorWhere } from 'tslint';

@Controller('roles')
export class RoleControler {
  constructor(private readonly roleSerive: RoleSerive) {
  }

  @Get(':id')
  async getRole(@Param('id', ParseIntPipe) id: number): Promise<RoleEntity> {
    return await this.roleSerive.get(id);
  }

  @Get()
  async getAllRole(): Promise<RoleEntity[]> {
    return await this.roleSerive.getAll();
  }

  @Post()
  async createRole(@Body() role: RoleEntity): Promise<RoleEntity> {
    return await this.roleSerive.create(role);
  }

  @Patch(':id')
  async updateRole(@Param('id', ParseIntPipe) id: number, @Body() role: RoleEntity) {
    await this.roleSerive.update(id, role);
    return true;
  }

  @Delete(':id')
  async deleteRole(@Param('id', ParseIntPipe) id: number) {
    await this.roleSerive.delete(id);
    return true;
  }
}
