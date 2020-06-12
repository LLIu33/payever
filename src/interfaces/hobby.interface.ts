import { Document } from 'mongoose';

export interface IHobby extends Document {
  readonly name: string;
}
