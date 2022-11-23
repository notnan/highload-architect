## Running the app

```bash
cp .env-example .env && docker-compose up -d
```
Запуск миграций
```bash
docker exec -i social-network_dev sh -c "db-migrate up"
```