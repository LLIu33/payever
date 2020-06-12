import { Document } from 'mongoose';

export interface Hobby extends Document {
  readonly name: string;
}
