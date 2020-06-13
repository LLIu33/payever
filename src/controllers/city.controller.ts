import { Controller, Get, Param, Query } from '@nestjs/common';

import { UserService } from '../services';

@Controller('city')
export class CityController {
  constructor(private readonly userService: UserService) {}
  @Get()
  public async getCitites(@Query('hobby') hobby?: string): Promise<any> {
    return this.userService.getCitiesByHobby(hobby);
  }
}
