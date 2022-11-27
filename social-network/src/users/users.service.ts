import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../db/database.service';

@Injectable()
export class UsersService {
	constructor(private readonly repository: DatabaseService) {}

	public async getUser(userId: string) {
		const [result] = await this.repository.query(
			`SELECT * FROM users WHERE ID = ?`,
			[userId],
			true,
		);

		return result;
	}
}
