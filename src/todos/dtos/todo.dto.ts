import { PartialType } from '@nestjs/swagger'
import { IsBoolean, IsMongoId, IsNotEmpty, IsString } from 'class-validator'

export class CreateTodoLDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string

  @IsString()
  @IsNotEmpty()
  readonly description: string

  @IsBoolean()
  @IsNotEmpty()
  readonly completed: boolean

  @IsNotEmpty()
  @IsMongoId()
  readonly userId: string
}

export class UpdateTodoDto extends PartialType(CreateTodoLDto) {}
