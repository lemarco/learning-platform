


install:
	cd frontend && pnpm i
	cd server && bun i

clean-docker:
	yes | docker system prune -a

copy-env-to-frontend:
	cp .env ./frontend

dev-frontend-up: copy-env-to-frontend
	docker compose -f ./frontend-compose.dev.yml up

clean-frontend:
	docker compose -f ./frontend-compose.dev.yml down
	@-rm -f ./frontend/.env
	@-rm -rf ./frontend/node_modules


clean-dev-frontend-up: clean-frontend
	make install
	make dev-frontend-up

dev-infra-up:
	docker compose -f ./infra-compose.dev.yml up -d


dev-infra-down:
	docker compose -f ./infra-compose.dev.yml down




copy-env-to-backend:
	cp .env ./backend/.env


dev-backend-up: copy-env-to-backend dev-infra-up
	docker compose -f ./backend-compose.dev.yml up

dev-env-up: dev-frontend-up dev-backend-up








clean-backend:
	@-rm -f ./server/.env
	@-rm -rf ./server/node_modules

clean: clean-frontend clean-backend clean-docker




clean-dev-env-up: clean dev-frontend-up dev-backend-up



dev-all: clean copy-env-to-frontend copy-env-to-backend install
	docker compose -f ./infra-compose.dev.yml -f ./backend-compose.dev.yml -f ./frontend-compose.dev.yml up 