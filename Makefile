# Makefile - Blog Post
DOCKER_IMAGE_NAME = blog-post
DOCKER_CONTAINER_NAME = blog-post-app
COMPOSE = docker compose
DE = docker exec -it
DEV = docker compose --env-file .env.dev -f docker-compose.dev.yaml
PROD = docker compose --env-file .env.prod -f docker-compose.prod.yaml
EXEC_APP = exec nextjs-app
DB_PORT = 5432
DB_CONTAINER_NAME = blog-postgres
DB_USER = postgres
POSTGRES_DB = blog_post
DB_PASS = postgres
STUDIO_PORT = 4983
DOCKER_TAG = $(shell node -p "require('./package.json').version")

gen-secret:
	openssl rand -base64 64

install:
	bun install

build-dev:
	DOCKER_IMAGE_NAME=$(DOCKER_IMAGE_NAME) DOCKER_TAG=$(DOCKER_TAG) $(DEV) build

build-prod:
	DOCKER_IMAGE_NAME=$(DOCKER_IMAGE_NAME) DOCKER_TAG=$(DOCKER_TAG) $(PROD) build --no-cache

run-dev:
	DOCKER_IMAGE_NAME=$(DOCKER_IMAGE_NAME) DOCKER_TAG=$(DOCKER_TAG) $(DEV) up --build

down-dev:
	$(DEV) down

run-prod:
	DOCKER_IMAGE_NAME=$(DOCKER_IMAGE_NAME) DOCKER_TAG=$(DOCKER_TAG) $(PROD) up -d --build

down-prod:
	$(PROD) down

migrate:
	$(DEV) $(EXEC_APP) bun db:migrate

studio:
	$(DEV) $(EXEC_APP) bun db:studio --host 0.0.0.0 --port $(STUDIO_PORT)

seed:
	$(DEV) $(EXEC_APP) bun db:seed

clean: down-dev down-prod
	$(DEV) down -v --remove-orphans --rmi local 2>/dev/null || true
	$(PROD) down -v --remove-orphans --rmi local 2>/dev/null || true
	docker system prune -af >/dev/null 2>&1 || true
	rm -rf node_modules .next >/dev/null 2>&1 || true

logs:
	$(DEV) logs -f

shell-dev:
	$(DEV) exec nextjs-app sh

shell-prod:
	$(PROD) exec nextjs-app sh

access-db-local:
	$(DE) $(DB_CONTAINER_NAME) psql -U $(DB_USER) -d $(POSTGRES_DB)

help:
	@echo ""
	@echo "$(DOCKER_IMAGE_NAME) v$(DOCKER_TAG)"
	@echo ""
	@echo "Local Commands:"
	@echo "  make install          Install dependencies using bun"
	@echo "  make dev              Run the app locally in development mode"
	@echo "  make gen-secret       Generate a secret key for NextAuth"
	@echo ""
	@echo "Dev Docker Commands:"
	@echo "  make build-dev        Build the dev Docker image"
	@echo "  make run              Build and run dev compose"
	@echo "  make run-down         Stop dev compose (keep volumes)"
	@echo "  make stop             Stop and remove dev containers"
	@echo "  make logs             Show dev container logs"
	@echo "  make shell            Access container shell"
	@echo ""
