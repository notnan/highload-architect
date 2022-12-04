import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { DatabaseModule } from '../db/database.module';
import { DatabaseService } from '../db/database.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStratagy } from '../strategies/jwt.strategy';
import { getJwtConfig } from '../configs/jwt.config';

@Module({
	imports: [
		UsersModule,
		ConfigModule,
		DatabaseModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig,
		}),
		PassportModule,
		UsersModule,
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStratagy],
	exports: [AuthService],
})
export class AuthModule {}
