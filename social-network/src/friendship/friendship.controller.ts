import {
	Body,
	Controller, Delete,
	Get, Param, Patch,
	Post,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserEmail } from '../decorators/user-email.decorator';
import { FriendshipService } from './friendship.service';
import { FriendshipDtoDto } from './dto/friendship.dto';
import * as Path from "path";

@Controller('friendship')
export class FriendshipController {
	constructor(private readonly friendshipService: FriendshipService) {}

	@UsePipes(new ValidationPipe())
	@UseGuards(JwtAuthGuard)
	@Post('add')
	public async add(@UserEmail() email: string, @Body() dto: FriendshipDtoDto) {
		await this.friendshipService.addAsFriendReq(email, dto.friendId);
	}

	@UsePipes(new ValidationPipe())
	@UseGuards(JwtAuthGuard)
	@Patch('confirm')
	public async confirm(
		@UserEmail() email: string,
		@Body() dto: FriendshipDtoDto,
	) {
		return await this.friendshipService.confirmFriendship(email, dto.friendId);
	}

	@UsePipes(new ValidationPipe())
	@UseGuards(JwtAuthGuard)
	@Delete('delete')
	public async delete(
		@UserEmail() email: string,
		@Body() dto: FriendshipDtoDto,
	) {
		//await this.friendshipService.deleteFriendship(email, dto.friendId);
	}

	@Get(':id')
	public async getFriends(@Param('id') id: string) {
		return await this.friendshipService.getFriends(id);
	}
}
