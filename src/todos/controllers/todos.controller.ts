import { Body, Controller, Get, Post, Param, Put, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { PayloadToken } from 'src/auth/models/token.model';
import { CreateTodoLDto, UpdateTodoDto } from '../dtos/todo.dto';
import { TodosService } from '../services/todos.service';

@UseGuards(JwtGuard)
@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Get()
  getTodos(@Req() req: Request) {
    const user = req.user as PayloadToken
    return this.todosService.todosByUser(user.sub)
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.todosService.getOne(id);
  }

  @Post()
  createTodo(@Body() data: CreateTodoLDto) {
    const todo = {
      ...data,
      completed: false
    }
    return this.todosService.createTodo(todo);
  }

  @Put(':id')
  updateTodo(@Param('id') id: string, @Body() changes: UpdateTodoDto) {
    return this.todosService.updateTodo(id, changes);
  }
}
