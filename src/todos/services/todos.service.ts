import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/services/users.service';
import { CreateTodoLDto, UpdateTodoDto } from '../dtos/todo.dto';
import { Todos } from '../entities/todo.entity';

@Injectable()
export class TodosService {

  constructor(
    @InjectModel(Todos.name) private todoModel: Model<Todos>,
    private userService: UsersService
  ) {}

  async todosByUser(userId: string) {
    const user = (await this.userService.findOne(userId)).toJSON()
    return this.todoModel.find({ userId: user._id.toString() }).exec()
  }

  async getOne(id: string) {
    return await this.todoModel.findById(id).exec()
  }

  createTodo(data: CreateTodoLDto) {
    const newTodo = new this.todoModel(data)
    return newTodo.save()
  }

  async updateTodo(id: string, changes: UpdateTodoDto) {
    const todo = await this.todoModel.findByIdAndUpdate(id, { $set: changes }, { new: true }).exec()
    if(!todo) {
      throw new NotFoundException(`Todo #${id} not found`)
    }
    return todo
  }

  removeTodo(id: string) {
    return this.todoModel.findByIdAndRemove(id)
  }
}
