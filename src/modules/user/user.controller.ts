import {
  Body,
  Controller,
  Delete,
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
  ApiQuery,
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
import { CreateAppointmentDto } from './DTO/create-appointment.dto';
import { IdGuard } from 'src/guards/id.guard';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userservice: UserService) {}

  @ApiOperation({
    summary: 'Cadastro de um usuário',
    description: 'Essa rota cria um novo usuário no banco de dados.',
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

  @Roles(Role.User, Role.Admin)
  @UseGuards(AuthGuard, RoleGuard, IdGuard)
  @ApiBearerAuth('access')
  @ApiOperation({
    summary: 'Atualização do cadastro',
    description:
      'Essa rota atualiza os dados do usuário cadastrado autenticado.',
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

  @Roles(Role.User, Role.Admin)
  @UseGuards(AuthGuard, RoleGuard, IdGuard)
  @ApiBearerAuth('access')
  @ApiOperation({
    summary: 'Atualização parcial do cadastro',
    description:
      'Essa rota atualiza alguns dados do usuário cadastrado autenticado.',
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

  @Roles(Role.User, Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  @ApiBearerAuth('access')
  @ApiOperation({
    summary: 'Retorna médicos cadastrados',
    description:
      'Essa rota retorna todos os médicos cadastrados no banco de dados.',
  })
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
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

  @Roles(Role.User, Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  @ApiBearerAuth('access')
  @ApiOperation({
    summary: 'Retorna médicos cadastrados com uma especilidade específica',
    description:
      'Essa rota retorna todos os médicos cadastrados com uma especilidade específica no banco de dados.',
  })
  @ApiQuery({ name: 'specialtyID', type: String, required: false })
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  @ApiResponse(responses.ok)
  @ApiResponse(responses.badRequest)
  @ApiResponse(responses.unauthorized)
  @ApiResponse(responses.forbidden)
  @ApiResponse(responses.unprocessable)
  @ApiResponse(responses.internalError)
  @Get('doctors/:specialtyID')
  findPreference(
    @Param('specialtyID') specialtyID: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.userservice.findPreference(specialtyID, page, limit);
  }

  @Roles(Role.User, Role.Admin)
  @UseGuards(AuthGuard, RoleGuard, IdGuard)
  @ApiBearerAuth('access')
  @ApiOperation({
    summary: 'Retorna todas as consultas cadastradas do usuário',
    description:
      'Essa rota retorna todas as consultas cadastrados por um usuário no banco de dados.',
  })
  @ApiResponse(responses.ok)
  @ApiResponse(responses.badRequest)
  @ApiResponse(responses.unauthorized)
  @ApiResponse(responses.forbidden)
  @ApiResponse(responses.unprocessable)
  @ApiResponse(responses.internalError)
  @Get('appointment/:userId')
  findAllByUser(@Param('userId') userId: string) {
    return this.userservice.findAllAppointmentsbyUser(userId);
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  @ApiBearerAuth('access')
  @ApiOperation({
    summary: 'Retorna todos os usuários',
    description:
      'Essa rota retorna todos os usuários cadastrados no banco de dados. Só pode ser acessada por um usuário "Admin".',
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

  @Roles(Role.User, Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  @ApiBearerAuth('access')
  @ApiOperation({
    summary: 'Cadastro de uma consulta',
    description:
      'Essa rota cria uma consulta para um usuário. Elas são criadas com o status "PENDENTE".',
  })
  @ApiResponse(responses.ok)
  @ApiResponse(responses.badRequest)
  @ApiResponse(responses.unauthorized)
  @ApiResponse(responses.forbidden)
  @ApiResponse(responses.unprocessable)
  @ApiResponse(responses.internalError)
  @Post('/appointment')
  createAppointment(@Body() data: CreateAppointmentDto) {
    return this.userservice.createAppointment(data);
  }
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access')
  @ApiOperation({
    summary: 'Remoção de consultas de um usuário',
    description: 'Essa rota deleta uma consulta específica.',
  })
  @ApiResponse(responses.ok)
  @ApiResponse(responses.badRequest)
  @ApiResponse(responses.unauthorized)
  @ApiResponse(responses.forbidden)
  @ApiResponse(responses.unprocessable)
  @ApiResponse(responses.internalError)
  @Delete('appointment/:appointmentId')
  remove(@Param('appointmentId') id: string) {
    return this.userservice.removeAppointment(id);
  }
}
