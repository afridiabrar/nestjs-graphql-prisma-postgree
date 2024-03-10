import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {

  @IsNotEmpty()
  @IsString()
  @IsNotEmpty()
  @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/g)
  @Field()
  email: string

  @MinLength(4)
  @MaxLength(15)
  @IsNotEmpty()
  @Field()
  username: string

  @Field()
  password: string

}
