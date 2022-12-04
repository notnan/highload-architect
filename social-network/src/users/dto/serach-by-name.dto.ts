import { IsString } from 'class-validator';

export class SerachByNameDto {
	@IsString()
	firstName: string;

	@IsString()
	lastName: string;
}
