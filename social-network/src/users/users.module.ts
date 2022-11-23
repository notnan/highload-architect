import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule } from '../db/database.module';

@Module({
	controllers: [UsersController],
	imports: [DatabaseModule],
	providers: [UsersService],
})
export class UsersModule {}
