import { Body, Controller, Get, Post, Put, Patch, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './DTO/create-user.dto';
import { UpdatePutUserDTO } from './DTO/update-put-user.dto';
import { UpdatePatchUserDTO } from './DTO/update-patch-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userservice: UserService) {}

  @Get()
  async list() {
    return this.userservice.list();
  }

  @Post()
  async create(@Body() data: CreateUserDTO) {
    return this.userservice.create(data);
  }

  @Put(':id')
  async update(@Body() data: UpdatePutUserDTO, @Param('id') id: string) {
    return this.userservice.update(id, data);
  }

  @Patch(':id')
  async updatePartial(@Body() data: UpdatePatchUserDTO, @Param('id') id: string) {
    return this.userservice.updatePartial(id, data);
  }

}
