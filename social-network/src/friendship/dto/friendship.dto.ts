import { IsString, IsNotEmpty } from 'class-validator';

export class FriendshipDtoDto {
	@IsNotEmpty()
	@IsString()
	friendId: string;
}
