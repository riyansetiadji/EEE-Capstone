.DEFAULT_GOAL := devel

devel:
	gunicorn -b 0.0.0.0:8090 --reload eecapstone:app
docker-build:
	docker build -t eecapstone:latest .
docker-setup: docker-build
	docker-compose -p docker up -d
docker-up: docker-build
	docker-compose -p docker up
docker-teardown:
	docker-compose down
	docker stop $(shell docker ps -a -q --filter="name=docker_eecapstone_1")
	docker rm $(shell docker ps -a -q --filter="name=docker_eecapstone_1")

