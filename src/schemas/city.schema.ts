import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class City extends Document {
  @Prop({ type: String, required: true })
  public name: string;
}

export const CitySchema: Schema = SchemaFactory.createForClass(City);
