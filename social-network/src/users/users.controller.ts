import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('user')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	public async getUser(@Param('id') id: string) {
		return await this.usersService.getUser(id);
	}
}
