import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { CreateUserDto } from '../dto/create-user.dto';
import { Hobby } from '../schemas/hobby.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    @InjectModel(Hobby.name)
    private hobbyModel: Model<Hobby>,
  ) {}

  public async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.features = await this.generateFeatures(createUserDto);
    const createdUser: User = new this.userModel(createUserDto);

    return createdUser.save();
  }

  public async delete(id: number): Promise<any> {
    return this.userModel.findById(id).remove();
  }

  public async addFriend(userId: number, friendId: number): Promise<User> {
    const user: User = await this.userModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const friend: User = await this.userModel.findById(friendId);
    if (!friend) {
      throw new Error('Friend user not found');
    }

    user.friends.push(friend._id);
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
      query[andConditionsKey].push({
        'hobbies.name': { $eq: hobby },
      });
    }

    if (city) {
      query[andConditionsKey].push({
        'cities.name': { $eq: city },
      });
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

  private async generateFeatures(createUserDto: CreateUserDto): Promise<any> {
    const hobbies: Hobby[] = await this.hobbyModel
      .find()
      .where('_id')
      .in(createUserDto.hobbies)
      .exec();

    const concertsList: string[] = ['Woodstock', 'US Festival', 'Kubana'];
    const resortList: string[] = [
      'Whistler Blackcomb',
      'Courchevel',
      'Zermatt',
    ];
    const stampList: string[] = [
      'Elvis presley',
      'Wounders of America',
      'Marvel Super Heroes',
    ];

    const featuresMap: object = {
      guitar: { concerts: concertsList },
      skiing: { resorts: resortList },
      stamp: { stamps: stampList },
    };

    const allFeatures: object[] = [];

    for (const featureKey in featuresMap) {
      if (featuresMap.hasOwnProperty(featureKey)) {
        for (const hobby of hobbies) {
          if (hobby.name === featureKey) {
            allFeatures.push(featuresMap[featureKey]);
          }
        }
      }
    }

    return allFeatures;
  }
}
