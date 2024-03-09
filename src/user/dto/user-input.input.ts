import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class UserInput {

  @Field()
  email: string
  
  @Field()
  password: string

}
