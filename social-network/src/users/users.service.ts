import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from '../db/database.service';
import { AuthRegisterLoginDto } from '../auth/dto/auth-register-login.dto';
import { ALREADY_REGISTERED_ERROR } from '../auth/auth.constants';
import { genSaltSync, hash } from 'bcryptjs';
import { snakeCase } from 'snake-case';

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

	public async searchByName(firstName: string, lastName: string) {
		const result = await this.repository.query(
			'SELECT * FROM users WHERE first_name LIKE ? and last_name LIKE ? ORDER BY id',
			[firstName, lastName].map((item) => `${item}%`),
			true,
		);
		console.log('__________________________________FINISH');
		
		return result;
	}

	async createUser(registerDto: AuthRegisterLoginDto): Promise<boolean> {
		//const [user] = await this.findByEmail(registerDto.email);
		//
		//if (user) {
		//	throw new UnauthorizedException(ALREADY_REGISTERED_ERROR);
		//}

		//registerDto.password = await hash(registerDto.password, genSaltSync(10));

		const result = await this.repository.query(
			'INSERT INTO users (??) VALUES (?)',
			[
				Object.keys(registerDto).map((item) => snakeCase(item)),
				Object.values(registerDto),
			],
			true,
		);

		return true;
	}

	findById(id: string | number): Promise<any> {
		return this.repository.query(
			`SELECT * FROM users WHERE id=? LIMIT 1`,
			[id],
			true,
		);
	}

	findByEmail(email: string) {
		return this.repository.query(
			`SELECT * FROM users WHERE email=? LIMIT 1`,
			[email],
			true,
		);
	}
}
