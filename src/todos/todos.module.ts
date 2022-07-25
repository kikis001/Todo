import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from 'src/users/services/users.service';
import { UsersModule } from 'src/users/users.module';
import { TodosController } from './controllers/todos.controller';
import { Todos, TodosSchema } from './entities/todo.entity';
import { TodosService } from './services/todos.service';
import { ProfileController } from './controllers/profile.controller';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
    { name: Todos.name, schema: TodosSchema }
  ])],
  // en los controllers van los con controladores
  controllers: [TodosController, ProfileController],
  // en los providers van los servicios
  providers: [TodosService],
  // en los exports van los servicios que queremos exportar y/o usar en otro modulo
  exports: [TodosService]
})
export class TodosModule {}
