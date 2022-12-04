import {
	Controller,
	Get,
	Param,
	Query,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('user')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get('search?')
	public async search(
		@Query('firstName') firstName?: string,
		@Query('lastName') lastName?: string,
	) {
		return await this.usersService.searchByName(firstName, lastName);
	}

	@Get(':id')
	public async getUser(@Param('id') id: string) {
		return await this.usersService.getUser(id);
	}
}
