import { HttpCode, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserInput } from './dto/user-input.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash,compare } from 'bcryptjs';
import { AuthenticationError, ForbiddenError } from '@nestjs/apollo';

@Injectable()
export class UserService {

  constructor(private prisma: PrismaService) {}

  @HttpCode(200)
 async create(createUserInput: CreateUserInput) {

    const foundUser = await this.prisma.user.findUnique({where: {"email":createUserInput.email } });
      if(foundUser) throw new ForbiddenError('Email is already in Use');

      const hashedPassword = await hash(createUserInput.password, 10);
    let AddedUser = await this.prisma.user.create({
      data : { email: createUserInput.email,
               username: createUserInput.username,
               password: hashedPassword
      }
    });

    let foundUserr = this.prisma.user.findUnique({where: {"email":AddedUser.email } });

   return foundUserr;
  }
  async login(userInput:UserInput){
    const foundUser = await this.prisma.user.findUnique({where: {"email":userInput.email } });
    if(!foundUser) throw new AuthenticationError('User Not Found')
    const passwordHasMatch = await compare(userInput.password, foundUser.password);
    if (!passwordHasMatch) {
      if(foundUser) throw new Error('Your Email Or Password is incorrect')
    }
//    const payload = { subject: foundUser.id, user_name: user.name };
//    return foundUser;
    // {
    //   token: 'asdadsdsadas873467234hgashjgasjddas',
    //   foundUser,
    // };
    var data = {
      token: 'asdgjhadgsjdgsah',
      foundUser
    }; 

    return foundUser;

  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
