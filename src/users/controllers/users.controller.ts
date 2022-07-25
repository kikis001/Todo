import { Controller, Get, Post, Put, Delete, Body } from '@nestjs/common';
import { CreateUserDto } from '../dtos/user.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private UserService: UsersService) {}

  @Get()
  getUsers() {
    return this.UserService.getAll()
  }

  @Post()
  createUser(@Body() data: CreateUserDto) {
    return this.UserService.createUser(data)
  }
}
