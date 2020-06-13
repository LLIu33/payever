import { Document } from 'mongoose';
import { City } from './city.interface';
import { Hobby } from './hobby.interface';

export interface User extends Document {
  readonly name: string;
  readonly hobbies?: [Hobby];
  readonly cities?: [City];
  readonly friends?: [User];
  readonly features?: object;
}
