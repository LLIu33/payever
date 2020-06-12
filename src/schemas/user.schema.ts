import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { Hobby } from '../interfaces/hobby.interface';
import { HobbySchema } from './hobby.schema';
import { CitySchema } from './city.schema';

@Schema()
export class User extends Document {
  @Prop({ type: String, requied: true })
  public name: string;

  @Prop([HobbySchema])
  public hobbies?: [{ type: Types.ObjectId; ref: 'Hobby' }];

  @Prop([CitySchema])
  public cities?: [{ type: Types.ObjectId; ref: 'City' }];

  @Prop()
  public friends?: [{ type: Types.ObjectId; ref: 'User' }];

  @Prop()
  public features?: object;
}

export const UserSchema: Schema = SchemaFactory.createForClass(User);
const concertsList: string[] = ['Woodstock', 'US Festival', 'Kubana'];
const resortList: string[] = ['Whistler Blackcomb', 'Courchevel', 'Zermatt'];
const stampList: string[] = [
  'Elvis presley',
  'Wounders of America',
  'Marvel Super Heroes',
];

UserSchema.pre('save', function (next: any): void {
  const user: Schema = this;
  const featuresMap: object = {
    guitar: { concerts: concertsList },
    skiing: { resorts: resortList },
    stamp: { stamps: stampList },
  };

  for (const featureKey in featuresMap) {
    if (user.hobbies.some((hobby: Hobby) => hobby.name === featureKey)) {
      user.features = { ...featuresMap[featureKey] };
    }
  }

  next();
});
