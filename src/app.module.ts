import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './services';
import { UserController } from './user.controller';
import { HobbyController } from './hobby.controller';
import { CityController } from './city.controller';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  controllers: [UserController, HobbyController, CityController],
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/test-task', {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserService],
})
export class AppModule {}
