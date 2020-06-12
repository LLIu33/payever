import { Controller, Get, Param } from '@nestjs/common';

import { SomeService } from './services';

@Controller('user')
export class UserController {
  constructor(
    private readonly someService: SomeService,
  ) {}

  @Get(':id')
  public async getUser(
    @Param('id') id: number,
  ): Promise<any> {}
}
