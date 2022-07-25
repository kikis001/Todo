import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { TodosService } from '../services/todos.service';
import { PayloadToken } from 'src/auth/models/token.model';

@UseGuards(JwtGuard)
@Controller('profile')
export class ProfileController {

  constructor(private todosService: TodosService) { }

  @Get('my-todos')
  getTodosByUser(@Req() req: Request) {
    const user = req.user as PayloadToken
    return this.todosService.todosByUser(user.sub)
  }
}
