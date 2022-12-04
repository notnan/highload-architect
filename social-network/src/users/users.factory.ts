import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from '../db/database.service';
import { UsersService } from './users.service';
import { faker } from '@faker-js/faker';
import { AuthRegisterLoginDto } from '../auth/dto/auth-register-login.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UsersFactory {
	constructor(
		private readonly repository: DatabaseService,
		private readonly usersService: UsersService,
	) {}

	public async createUsers(num: number) {
		for (let i = 0; i < num; i++) {
			const userDto = this.createRandomUserDto();
			await this.usersService.createUser(userDto);

		}
	}

	createRandomUserDto(): AuthRegisterLoginDto {
		const user = {
			email: `${faker.datatype.uuid()}."@gmail.com"`,
			password: faker.internet.password(),
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			interests: faker.lorem.paragraph(),
			age: faker.datatype.number({ min: 14, max: 65 }),
			cityId: this.getRandomFromArray([1, 2, 3]),
		};

		return plainToClass(AuthRegisterLoginDto, user);
	}

	getRandomFromArray(array: Array<any>): any {
		faker.datatype.number({ min: 14, max: 65 });
		return array[Math.floor(Math.random() * array.length)];
	}
}
