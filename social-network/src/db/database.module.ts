import { Logger, Module, OnApplicationShutdown } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { ModuleRef } from '@nestjs/core';

import { DatabaseService } from './database.service';
import { createPool } from 'mysql2';

const databasePoolFactory = async (configService: ConfigService) => {
	return createPool({
		user: configService.get<string>('MYSQL_USER'),
		host: configService.get<string>('MYSQL_HOST'),
		database: configService.get<string>('MYSQL_DB_NAME'),
		password: configService.get<string>('MYSQL_PASSWORD'),
		waitForConnections: true,
		connectionLimit: 10,
		connectTimeout: 15000,
		rowsAsArray: false,
		enableKeepAlive: true,
		multipleStatements: true,
	}).promise();
};

@Module({
	providers: [
		{
			provide: 'DATABASE_POOL',
			inject: [ConfigService],
			useFactory: databasePoolFactory,
		},
		DatabaseService,
	],
	exports: [DatabaseService],
})
export class DatabaseModule {
	private readonly logger = new Logger(DatabaseModule.name);
}
