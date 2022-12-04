import { Module } from '@nestjs/common';
import { FriendshipController } from './friendship.controller';
import { FriendshipService } from './friendship.service';
import { DatabaseModule } from '../db/database.module';
import { UsersModule } from '../users/users.module';

@Module({
	controllers: [FriendshipController],
	imports: [DatabaseModule, UsersModule],
	providers: [FriendshipService],
})
export class FriendshipModule {}
