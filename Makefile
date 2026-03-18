# Makefile - Blog Post
DOCKER_IMAGE_NAME = blog-post
DOCKER_CONTAINER_NAME = blog-post
COMPOSE = docker compose
COMPOSE_FILE = docker-compose.yaml
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
	$(COMPOSE) -f $(COMPOSE_FILE) up

run-down:
	$(COMPOSE) -f $(COMPOSE_FILE) up --build

stop:
	$(COMPOSE) -f $(COMPOSE_FILE) down

clean:
	$(COMPOSE) -f $(COMPOSE_FILE) down -v || true
	docker rmi -f $(DOCKER_IMAGE_NAME) >/dev/null 2>&1 || true
	docker system prune -af >/dev/null 2>&1 || true
	rm -rf node_modules .next >/dev/null 2>&1 || true

logs:
	$(COMPOSE) -f $(COMPOSE_FILE) logs -f

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
	@echo "Production Commands:"
	@echo "  bun run build        Run the app in production mode"
	@echo ""
	@echo "Docker Commands:"
	@echo "  make build            Build the Docker image"
	@echo "  make run              Run the Docker container"
	@echo "  make stop             Stop and remove the container"
	@echo "  make clean            Remove image and clean environment"
	@echo "  make logs             Show container logs"
	@echo "  make shell            Access container shell"
	@echo ""
