ifneq (,$(wildcard ./.env))
	include .env
	export
	ENV_FILE_PARAM = --env-file .env
endif

build:
	docker-compose up  -d --build --remove-orphans

up:
	docker-compose up -d

up-v:
	docker-compose up -v

down:
	docker-compose down

down-v:
	docker-compose down -v

volume:
	docker volume inspect mongodb-data