
dev-frontend:
	cp ./.env ./frontend/.env
	docker compose -f ./frontend-compose.dev.yml up