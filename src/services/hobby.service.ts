import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Hobby } from '../schemas/hobby.schema';

@Injectable()
export class HobbyService {
  constructor(
    @InjectModel(Hobby.name)
    private hobbyModel: Model<Hobby>,
  ) {}

  public async findByIds(ids: []): Promise<Hobby[]> {
    return this.hobbyModel.find().where('_id').in(ids).exec();
  }
}
