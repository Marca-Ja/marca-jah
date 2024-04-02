import { ApiResponseOptions } from '@nestjs/swagger';

export type ApiResponses = {
  ok: ApiResponseOptions;
  created: ApiResponseOptions;
  accepted: ApiResponseOptions;
  badRequest: ApiResponseOptions;
  unauthorized: ApiResponseOptions;
  forbidden: ApiResponseOptions;
  unprocessable: ApiResponseOptions;
  internalError: ApiResponseOptions;
};

export const responses: ApiResponses = {
  ok: {
    status: 200,
    description: 'Ocorreu tudo bem.',
  },
  created: {
    status: 201,
    description: 'Registro criado com sucesso.',
  },
  accepted: {
    status: 202,
    description: 'Ocorreu tudo bem, mas pode demorar para terminar.',
  },
  badRequest: {
    status: 400,
    description: 'Algum dado fornecido é inválido.',
  },
  unauthorized: {
    status: 401,
    description: 'Requisição não autorizada.',
  },
  forbidden: {
    status: 403,
    description: 'Você não tem permissão para executar essa ação.',
  },
  unprocessable: {
    status: 422,
    description: 'A informação foi entendida, mas não pode ser processada.',
  },
  internalError: {
    status: 500,
    description: 'Ocorreu um erro interno no servidor.',
  },
};
