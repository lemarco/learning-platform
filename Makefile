# first rule should be an 'all', in order to be executed as a default rule during simple `make` command
.PHONY: all
all: copy-env-to-frontend copy-env-to-backend install
	docker compose -f ./infra-compose.dev.yml -f ./backend-compose.dev.yml -f ./frontend-compose.dev.yml up -d

.PHONY: prepare
prepare:
	npm i -g bun pnpm

.PHONY: install
install:
	cd frontend && pnpm i
	cd backend && bun i

.PHONY: clean-docker
clean-docker:
	yes | docker system prune -a

.PHONY: copy-env-to-frontend
copy-env-to-frontend:
	cp .env ./frontend

.PHONY: dev-frontend-up
dev-frontend-up: copy-env-to-frontend
	docker compose -f ./frontend-compose.dev.yml up -d

.PHONY: clean-frontend
clean-frontend:
	docker compose -f ./frontend-compose.dev.yml down
	@-rm -f ./frontend/.env
	@-rm -rf ./frontend/node_modules

.PHONY: clean-dev-frontend-up
clean-dev-frontend-up: clean-frontend
	make install
	make dev-frontend-up

.PHONY: dev-infra-up
dev-infra-up:
	docker compose -f ./infra-compose.dev.yml up -d

.PHONY: dev-infra-down
dev-infra-down:
	docker compose -f ./infra-compose.dev.yml down

.PHONY: copy-env-to-backend
copy-env-to-backend:
	cp .env ./backend/.env

.PHONY: dev-backend-up
dev-backend-up: copy-env-to-backend dev-infra-up
	docker compose -f ./backend-compose.dev.yml up -d

.PHONY: dev-env-up
dev-env-up: dev-frontend-up dev-backend-up

.PHONY: clean-backend
clean-backend:
	@-rm -f ./backend/.env
	@-rm -rf ./backend/node_modules

.PHONY: clean
clean: clean-frontend clean-backend clean-docker

.PHONY: clean-dev-env-up
clean-dev-env-up: clean dev-frontend-up dev-backend-up

.PHONY: dev-all
dev-all: clean copy-env-to-frontend copy-env-to-backend install
	docker compose -f ./infra-compose.dev.yml -f ./backend-compose.dev.yml -f ./frontend-compose.dev.yml up -d

.PHONY: re
re: clean all
