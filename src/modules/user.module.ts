import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService, HobbyService } from '../services';
import { UserController } from '../controllers/user.controller';
import { HobbyController } from '../controllers/hobby.controller';
import { User, UserSchema } from '../schemas/user.schema';
import { Hobby, HobbySchema } from '../schemas/hobby.schema';
import { CityController } from '../controllers/city.controller';
import { City, CitySchema } from '../schemas/city.schema';

@Module({
  controllers: [UserController, HobbyController, CityController],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Hobby.name, schema: HobbySchema }]),
    MongooseModule.forFeature([{ name: City.name, schema: CitySchema }]),
  ],
  providers: [UserService, HobbyService],
})
export class UserModule {}
