import {
	BadRequestException,
	HttpException,
	HttpStatus,
	Injectable,
} from '@nestjs/common';
import { DatabaseService } from '../db/database.service';
import { format } from 'mysql2';
import { ALREADY_FRIENDS, USER_NOT_FOUND_ERROR } from './friendship.constants';
import { UsersService } from '../users/users.service';

@Injectable()
export class FriendshipService {
	constructor(
		private readonly repository: DatabaseService,
		private readonly usersService: UsersService,
	) {}

	public async addAsFriendReq(email: string, userId: string) {
		const [result] = await this.usersService.findByEmail(email);
		const user = await this.usersService.findById(userId);

		if (!user) {
			throw new HttpException(USER_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
		}

		if (await this.areFriends(result.id, userId)) {
			throw new BadRequestException(ALREADY_FRIENDS);
		}

		if (result.id == userId) {
			throw new BadRequestException('Некорректно указан id');
		}

		await this.repository.query(
			`INSERT INTO friends
			(friend_one,friend_two)
			VALUES (?, ?)`,
			[result.id, userId],
		);
	}

	private async areFriends(currentUserId: string, userId: string) {
		const params = [currentUserId, userId];
		const [result] = await this.repository.query(
			`SELECT * FROM friends WHERE (friend_one = ? AND friend_two = ?) OR (friend_one = ? AND friend_two = ?)`,
			[...params, ...params.reverse()],
		);

		return result && result.length > 0;
	}

	public async confirmFriendship(email: string, userId: string) {
		const [result] = await this.usersService.findByEmail(email);

		const user = await this.usersService.findById(userId);

		if (!user.length) {
			throw new HttpException(USER_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
		}

		await this.repository.query(
			`UPDATE friends SET status='1' WHERE friend_one = (?) AND friend_two = (?)`,
			[userId, result.id],
		);

		return { message: 'Заявка успешно подтверждена' };
	}

	public async getFriends(id: string) {
		const result = await this.repository.query(
			`SELECT * FROM users LEFT JOIN friends ON friends.friend_one = users.id OR friends.friend_two = users.id
 					WHERE friends.friend_one = ? OR friends.friend_two = ? AND STATUS = '1'`,
			[id, id],
			true,
		);

		return result.filter((item) => item.id != id);
	}
}
