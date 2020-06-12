import { Controller, Get, Param, Query } from '@nestjs/common';

import { UserService } from './services';

@Controller('hobby')
export class HobbyController {
  constructor(private readonly userService: UserService) {}
  @Get()
  public async getHobbies(@Query('city') city?: string): Promise<any> {
    return this.userService.getHobbiesByCity(city);
  }
}
