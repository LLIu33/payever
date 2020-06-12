import { Document } from 'mongoose';
import { ICity } from './city.interface';
import { IHobby } from './hobby.interface';

export interface IUser extends Document {
  readonly name: string;
  readonly hobbies?: [IHobby];
  readonly cities?: [ICity];
  readonly friends?: [IUser];
}
