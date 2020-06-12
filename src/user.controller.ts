import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Body,
  Put,
  Query,
} from '@nestjs/common';

import { UserService } from './services';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public async createUser(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.userService.create(createUserDto);
  }

  @Delete(':id')
  public async deleteUser(@Param('id') id: number): Promise<any> {
    return this.userService.delete(id);
  }

  @Put(':id/add/:friend')
  public async addFriend(
    @Param('id') id: number,
    @Param('friend') friendId: number,
  ): Promise<any> {
    return this.userService.addFriend(id, friendId);
  }

  @Get(':id/friends')
  public async getFriends(
    @Param('id') id: number,
    @Query('hobby') hobby?: string,
    @Query('city') city?: string,
  ): Promise<any> {
    return this.userService.getFriends(id, hobby, city);
  }
}
