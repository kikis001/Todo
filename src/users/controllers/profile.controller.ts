// import { Controller, Get, Req, UseGuards } from '@nestjs/common';
// import { Request } from 'express';
// import { JwtGuard } from 'src/auth/guards/jwt.guard';
// import { PayloadToken } from 'src/auth/models/token.model';
// import { TodosService } from 'src/todos/services/todos.service';

// @UseGuards(JwtGuard)
// @Controller('profile')
// export class ProfileController {
//   constructor(private todosService: TodosService) {}

//   @Get('tasks')
//   getMyTasks(@Req() req: Request) {
//     const user = req.user as PayloadToken
//     return this.todosService.todosByUser(user.sub)
//   }
// }
