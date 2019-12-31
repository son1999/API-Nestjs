import { Body, Controller, Get, Param, Patch, Post, Delete, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.userService.get(id);
  }

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
}
