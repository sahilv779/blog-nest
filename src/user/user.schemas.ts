import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop()
  name: string;

  @Prop({ required: true, type: String })
  providerId: string;

  @Prop({ required: true })
  provider: string;

  _id: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
