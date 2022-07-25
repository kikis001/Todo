import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/users/entities/user.entity';

@Schema()
export class Todos extends Document {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: Boolean, required: true })
  completed: boolean

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  userId: User | Types.ObjectId
}

export const TodosSchema = SchemaFactory.createForClass(Todos)
