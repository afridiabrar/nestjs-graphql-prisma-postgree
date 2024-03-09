import { Injectable } from '@nestjs/common';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TodoService {

  constructor(private prisma: PrismaService){}

 async create(createTodoInput: CreateTodoInput) {
    return await this.prisma.todo.create({
      data: { title: createTodoInput.title,
              category: createTodoInput.category
//              category: createTodoInput.category
       },
    });
  }

  findAll() {
//    return this.prisma.todo.findMany();
//      return this.prisma.$executeRawUnsafe('SELECT * FROM Todo')
    const result = this.prisma.$queryRawUnsafe(
      'SELECT * FROM `Todo`'
    )
  }

  findOne(id: number) {
    return this.prisma.todo.findUnique({where: { id } });
  }

  update(id: number, updateTodoInput: UpdateTodoInput) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
