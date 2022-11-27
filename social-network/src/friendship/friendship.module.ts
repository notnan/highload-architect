import { Module } from '@nestjs/common';
import { FriendshipController } from './friendship.controller';
import { FriendshipService } from './friendship.service';
import { DatabaseModule } from '../db/database.module';
import { AuthModule } from '../auth/auth.module';

@Module({
	controllers: [FriendshipController],
	imports: [DatabaseModule, AuthModule],
	providers: [FriendshipService],
})
export class FriendshipModule {}
