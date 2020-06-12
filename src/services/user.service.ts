import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../interfaces/user.interface';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
  ) {}

  public async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser: User = new this.userModel(createUserDto);

    return createdUser.save();
  }
}
