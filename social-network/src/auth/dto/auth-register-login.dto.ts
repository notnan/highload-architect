import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class AuthRegisterLoginDto {
	@IsString()
	@IsNotEmpty()
	email: string;

	@IsString()
	@IsNotEmpty()
	password: string;

	@IsString()
	@IsNotEmpty()
	firstName: string;

	@IsString()
	@IsNotEmpty()
	lastName: string;

	@IsString()
	interests: string;

	@IsString()
	gender: string;

	@IsNumber()
	age: number;

	@IsNumber()
	cityId: number;
}
