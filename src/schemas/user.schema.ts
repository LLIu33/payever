import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { HobbySchema } from './hobby.schema';
import { CitySchema } from './city.schema';

@Schema()
export class User extends Document {
  @Prop({ type: String, requied: true })
  public name: string;

  @Prop([HobbySchema])
  public hobbies?: [{ type: mongoose.Types.ObjectId; ref: 'Hobby' }];

  @Prop([CitySchema])
  public cities?: [{ type: mongoose.Types.ObjectId; ref: 'City' }];

  @Prop()
  public friends?: [{ type: mongoose.Types.ObjectId; ref: 'User' }];
}

export const UserSchema: Schema = SchemaFactory.createForClass(User);
