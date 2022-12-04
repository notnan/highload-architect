import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
import { DatabaseService } from '../db/database.service';
import { compare, genSaltSync, hash, hashSync } from 'bcryptjs';
import { snakeCase } from 'snake-case';
import {
	USER_NOT_FOUND_ERROR,
	WRONG_PASSWORD_ERROR,
} from './auth.constants';
import { JwtService } from '@nestjs/jwt';
import {UsersService} from "../users/users.service";

@Injectable()
export class AuthService {
	constructor(
		private readonly repository: DatabaseService,
		private readonly jwtService: JwtService,
		private readonly usersService: UsersService,
	) {}

	async validateLogin(loginDto: AuthEmailLoginDto): Promise<{ email: string }> {
		const result = await this.usersService.findByEmail(loginDto.email);

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

	async login(email: string) {
		const payload = { email };
		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}
}
