import { Controller, Get, Param } from '@nestjs/common';

import { UserService } from './services';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  public async getUser(@Param('id') id: number): Promise<any> {}
}
