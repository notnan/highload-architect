import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'mysql2';

@Injectable()
export class DatabaseService {
	private pool;
	constructor(@Inject('DATABASE_POOL') pool: Pool) {
		this.pool = pool;
	}

	public async query<T>(
		query: string,
		params: T[] | [] = [],
		getFirst = false,
	) {
		const result = await this.pool.query(query, params);

		if (getFirst) {
			return result[0];
		}

		return result;
	}
}
