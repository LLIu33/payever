import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SomeService } from './services';
import { UserController } from './user.controller';

@Module({
  controllers: [
    UserController,
  ],
  imports: [
    MongooseModule.forRoot(
      'mongodb://localhost:27017/test-task',
      {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    ),
  ],
  providers: [
    SomeService,
  ],
})
export class AppModule {}
