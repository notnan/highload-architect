import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule } from '../db/database.module';
import { UsersFactory } from './users.factory';

@Module({
	controllers: [UsersController],
	imports: [DatabaseModule],
	providers: [UsersService, UsersFactory],
	exports: [UsersService],
})
export class UsersModule {}
