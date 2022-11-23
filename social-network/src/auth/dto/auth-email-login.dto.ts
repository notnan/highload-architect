import { IsString, IsNotEmpty } from 'class-validator';

export class AuthEmailLoginDto {
	@IsNotEmpty()
	@IsString()
	email: string;

	@IsNotEmpty()
	@IsString()
	password: string;
}
