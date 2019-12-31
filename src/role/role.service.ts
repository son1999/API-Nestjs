import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from './role.entity';

@Injectable()
export class RoleSerive {
  constructor(
    @InjectRepository(RoleRepository)
    private readonly roleRepository: RoleRepository,
  ) {
  }

  // @ts-ignore
  async get(id: number): Promise<RoleEntity> {
    if (!id) {
      throw new BadRequestException('id must be sent');
    }

    const role: RoleEntity = await this.roleRepository.findOne(id, { where: { status: 'ACTIVE' } });

    if (!role) {
      throw new NotFoundException();
    }

    return role;
  }

  async getAll(): Promise<RoleEntity[]> {
    return await this.roleRepository.find({ where: { status: 'ACTIVE' } });
  }

  async create(role: RoleEntity): Promise<RoleEntity> {
    return await this.roleRepository.save(role);
  }

  async update(id: number, role: RoleEntity): Promise<void> {
    await this.roleRepository.update(id, role);
  }

  async delete(id: number): Promise<void> {
    const roleExists = await this.roleRepository.findOne(id, { where: { status: 'ACTIVE' } });

    if (!roleExists) {
      throw new NotFoundException();
    }
    await this.roleRepository.update(id, {status: 'INACTIVE'});
  }
}
