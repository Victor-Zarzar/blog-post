# Makefile - Blog Post
DOCKER_IMAGE_NAME = blog-post
DOCKER_CONTAINER_NAME = blog-post
COMPOSE = docker compose
DEV_COMPOSE_FILE = docker-compose.yaml
PORT = 3000
DOCKER_TAG = 1.0.0

gen-secret:
	openssl rand -base64 64

install:
	bun install

dev: install
	bun run dev

prod:
	bun run build

build:
	docker build -t $(DOCKER_IMAGE_NAME):$(DOCKER_TAG) .

run: build
	$(COMPOSE) -f $(DEV_COMPOSE_FILE) up

run-down:
	$(COMPOSE) -f $(DEV_COMPOSE_FILE) down

stop:
	$(COMPOSE) -f $(DEV_COMPOSE_FILE) down

clean: stop
	$(COMPOSE) -f $(DEV_COMPOSE_FILE) down -v || true
	docker rmi -f $(DOCKER_IMAGE_NAME):dev $(DOCKER_IMAGE_NAME):$(DOCKER_TAG) >/dev/null 2>&1 || true
	docker system prune -af >/dev/null 2>&1 || true
	rm -rf node_modules .next >/dev/null 2>&1 || true

logs:
	$(COMPOSE) -f $(DEV_COMPOSE_FILE) logs -f

shell:
	docker exec -it $(DOCKER_CONTAINER_NAME) sh

help:
	@echo ""
	@echo "Blog Post Makefile ($(DOCKER_TAG))"
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
