import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../interfaces/user.interface';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('User')
    private userModel: Model<User>,
  ) {}

  public async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser: User = new this.userModel(createUserDto);

    return createdUser.save();
  }

  public async delete(id: number): Promise<any> {
    return this.userModel.findById(id).remove();
  }

  public async addFriend(userId: number, friendId: number): Promise<any> {
    const user: User = await this.userModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const friend: User = await this.userModel.findById(friendId);
    if (!friend) {
      throw new Error('Friend user not found');
    }

    user.friends.push(friend);
    await user.save();

    return user;
  }

  public async findById(id: number): Promise<User> {
    return this.userModel.findById(id);
  }

  public async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  public async getFriends(
    userId: number,
    hobby?: string,
    city?: string,
  ): Promise<any> {
    const user: User = await this.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    const query: object = { $and: [{ _id: { $in: user.friends } }] };
    const andConditionsKey: string = '$and';

    if (hobby) {
      query[andConditionsKey].push({ 'hobbies.name': { $eq: hobby } });
    }

    if (city) {
      query[andConditionsKey].push({ 'cities.name': { $eq: city } });
    }

    return this.userModel.find(query).exec();
  }

  public async getHobbiesByCity(city: string): Promise<any> {
    if (!city) {
      throw new Error('City not found');
    }

    return this.userModel.aggregate([
      { $unwind: '$hobbies' },
      { $match: { 'cities.name': city } },
      { $group: { _id: '$hobbies.name' } },
    ]);
  }

  public async getCitiesByHobby(hobby: string): Promise<any> {
    if (!hobby) {
      throw new Error('Hobby not found');
    }

    return this.userModel.aggregate([
      { $unwind: '$cities' },
      { $match: { 'hobbies.name': hobby } },
      { $group: { _id: '$cities.name' } },
    ]);
  }
}
