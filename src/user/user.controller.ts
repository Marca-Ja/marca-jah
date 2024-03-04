import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './DTO/create-user.dto';

@Controller('client')
export class UserController {
  constructor(private readonly userservice: UserService) {}

  @Post()
  async create(@Body() data: CreateUserDTO) {
    return this.userservice.create(data);
  }

  @Get()
  async list() {
    return this.userservice.list();
  }
}
