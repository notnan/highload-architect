import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
import { DatabaseService } from '../db/database.service';
import { compare, genSaltSync, hash, hashSync } from 'bcryptjs';
import { snakeCase } from 'snake-case';
import {ALREADY_REGISTERED_ERROR, USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR} from './auth.constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		private readonly repository: DatabaseService,
		private readonly jwtService: JwtService,
	) {}

	async validateLogin(loginDto: AuthEmailLoginDto): Promise<{ email: string }> {
		const result = await this.findByEmail(loginDto.email);

		if (!result.length) {
			throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
		}

		const isCorrectPassword = await compare(
			loginDto.password,
			result[0].password,
		);

		if (!isCorrectPassword) {
			throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
		}

		const id = result[0].insertId;

		return { email: loginDto.email };
	}

	async createUser(
		registerDto: AuthRegisterLoginDto,
	): Promise<{ token: string }> {
		const [user] = await this.findByEmail(registerDto.email);

		if (user) {
			throw new UnauthorizedException(ALREADY_REGISTERED_ERROR);
		}

		registerDto.password = await hash(registerDto.password, genSaltSync(10));

		const result = await this.repository.query(
			'INSERT INTO users (??) VALUES (?)',
			[
				Object.keys(registerDto).map((item) => snakeCase(item)),
				Object.values(registerDto),
			],
			true,
		);

		return this.findById(result.insertId);
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

	async login(email: string) {
		const payload = { email };
		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}
}
