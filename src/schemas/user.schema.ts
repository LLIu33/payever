import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Hobby } from './hobby.schema';

@Schema()
export class User extends mongoose.Document {
  @Prop({ type: String, requied: true })
  public name: string;

  @Prop([mongoose.Types.ObjectId])
  public hobbies?: [{ type: mongoose.Types.ObjectId; ref: 'Hobby' }];

  @Prop([mongoose.Types.ObjectId])
  public cities?: [{ type: mongoose.Types.ObjectId; ref: 'City' }];

  @Prop([mongoose.Types.ObjectId])
  public friends?: [{ type: mongoose.Types.ObjectId; ref: 'User' }];

  @Prop()
  public features?: object;
}

export const UserSchema: any = SchemaFactory.createForClass(User);
