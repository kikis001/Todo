import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getAll() {
    return await this.userModel.find().exec();
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id).exec()
    if(!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user
  }

  async createUser(data: CreateUserDto) {
    const newUser = new this.userModel(data)
    const hashPassword = await bcrypt.hash(newUser.password, 10)
    newUser.password = hashPassword
    const user = await newUser.save()
    const { password, ...rta } = user.toJSON()
    return rta
  }

  async getEmailUser(email: string) {
    const userEmail = await this.userModel.findOne({ email }).exec();
    return userEmail;
  }

  async update(id: string, changes: UpdateUserDto) {
    return await this.userModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
  }
}
