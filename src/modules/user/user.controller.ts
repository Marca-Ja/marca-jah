import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '../../enum/role.enum';
import { responses } from '../../global/docs/schema.docs';
import { AuthGuard } from '../../guards/auth.guard';
import { RoleGuard } from '../../guards/role.guard';
import { CreateUserDTO } from './DTO/create-user.dto';
import { UpdatePatchUserDTO } from './DTO/update-patch-user.dto';
import { UpdatePutUserDTO } from './DTO/update-put-user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Roles(Role.User)
@Controller('user')
export class UserController {
  constructor(private readonly userservice: UserService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @ApiBearerAuth('access')
  @ApiOperation({
    summary: 'Retorna todos os usuários',
    description: 'Essa rota...',
  })
  @ApiResponse(responses.ok)
  @ApiResponse(responses.badRequest)
  @ApiResponse(responses.unauthorized)
  @ApiResponse(responses.forbidden)
  @ApiResponse(responses.unprocessable)
  @ApiResponse(responses.internalError)
  @Get()
  async list() {
    return this.userservice.list();
  }

  @ApiOperation({
    summary: 'Cadastro de um usuário',
    description: 'Essa rota cria um novo usuário no banco de dados ',
  })
  @ApiResponse(responses.created)
  @ApiResponse(responses.badRequest)
  @ApiResponse(responses.unauthorized)
  @ApiResponse(responses.forbidden)
  @ApiResponse(responses.unprocessable)
  @ApiResponse(responses.internalError)
  @Post()
  async create(@Body() data: CreateUserDTO) {
    return this.userservice.create(data);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @ApiBearerAuth('access')
  @ApiOperation({
    summary: 'Atualização do cadastro',
    description:
      'Essa rota atualiza os dados do usuário cadastrado autenticado',
  })
  @ApiResponse(responses.ok)
  @ApiResponse(responses.badRequest)
  @ApiResponse(responses.unauthorized)
  @ApiResponse(responses.forbidden)
  @ApiResponse(responses.unprocessable)
  @ApiResponse(responses.internalError)
  @Put(':id')
  async update(@Body() data: UpdatePutUserDTO, @Param('id') id: string) {
    return this.userservice.update(id, data);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @ApiBearerAuth('access')
  @ApiOperation({
    summary: 'Atualização parcial do cadastro',
    description:
      'Essa rota atualiza alguns dados do usuário cadastrado autenticado',
  })
  @ApiResponse(responses.ok)
  @ApiResponse(responses.badRequest)
  @ApiResponse(responses.unauthorized)
  @ApiResponse(responses.forbidden)
  @ApiResponse(responses.unprocessable)
  @ApiResponse(responses.internalError)
  @Patch(':id')
  async updatePartial(
    @Body() data: UpdatePatchUserDTO,
    @Param('id') id: string,
  ) {
    return this.userservice.updatePartial(id, data);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('access')
  @ApiResponse(responses.ok)
  @ApiResponse(responses.badRequest)
  @ApiResponse(responses.unauthorized)
  @ApiResponse(responses.forbidden)
  @ApiResponse(responses.unprocessable)
  @ApiResponse(responses.internalError)
  @Get('doctors')
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.userservice.findAll(page, limit);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('access')
  @ApiResponse(responses.ok)
  @ApiResponse(responses.badRequest)
  @ApiResponse(responses.unauthorized)
  @ApiResponse(responses.forbidden)
  @ApiResponse(responses.unprocessable)
  @ApiResponse(responses.internalError)
  @Get('doctors/:specialtyID')
  findPreference(@Param('specialtyID') specialtyID: string, @Query('page') page: number, @Query('limit') limit: number) {
    return this.userservice.findPreference(specialtyID, page, limit);
  }

}
