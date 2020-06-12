import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Hobby extends Document {
  @Prop({ type: String, required: true })
  public name: string;
}

export const HobbySchema: any = SchemaFactory.createForClass(Hobby);
