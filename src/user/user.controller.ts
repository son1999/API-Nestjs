import { Body, Controller, Get, Param, Patch, Post, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../role/decorators/role.decorator';
import { RoleGuard } from '../role/guard/role.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get(':id')
  @Roles('ADMIN', 'AUTHOR')
  @UseGuards(AuthGuard(), RoleGuard)
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.userService.get(id);
  }

  // @UseGuards(AuthGuard())
  @Get()
  async getAllUser(): Promise<User[]> {
    return await this.userService.getAll();
  }

  @Post()
  async createUser(@Body() user: User): Promise<User> {
    return await this.userService.create(user);
  }

  @Patch(':id')
  async updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: User) {
    await this.userService.update(id, user);
    return true;
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    await this.userService.delete(id);
    return true;
  }

  @Post('setRole/:userId/:roleId')
  async setRoleToUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('roleId', ParseIntPipe) roleId: number,
  ) {
    return this.userService.setRoleToUser(userId, roleId);
  }
}
