import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
import { UsersService } from "../users/users.service";

@Controller({
	path: 'auth',
	version: '1',
})
export class AuthController {
	constructor(private readonly authService: AuthService, private readonly usersService: UsersService) {}

	@Post('login')
	@UsePipes(new ValidationPipe())
	@HttpCode(HttpStatus.OK)
	public async login(@Body() loginDto: AuthEmailLoginDto) {
		const { email } = await this.authService.validateLogin(loginDto);
		return this.authService.login(email);
	}

	@Post('register')
	@UsePipes(new ValidationPipe())
	@HttpCode(HttpStatus.OK)
	public async registser(@Body() registerLoginDto: AuthRegisterLoginDto) {
		return this.usersService.createUser(registerLoginDto);
	}
}
