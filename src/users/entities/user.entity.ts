import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Todos, TodosSchema } from 'src/todos/entities/todo.entity';

@Schema()
export class User extends Document {
  @Prop({ type: String, require: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

//   @Prop({ type: [{ type: Types.ObjectId, ref: Todos.name }] })
//   todos: Types.Array<Todos>
}

export const UserSchema = SchemaFactory.createForClass(User);
