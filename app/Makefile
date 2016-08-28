.DEFAULT_GOAL := devel

devel:
	gunicorn -b 0.0.0.0:8090 --reload eecapstone:app
docker-build:
	docker build -t eecapstone:latest .
docker-setup: docker-build
	docker-compose -p docker up -d
docker-up: docker-build
	docker-compose -p docker up
docker-up-back:
	docker-compose -p docker up -d
docker-teardown:
	docker-compose down
	docker stop $(shell docker ps -a -q --filter="name=docker_apache_openam_1")
	docker stop $(shell docker ps -a -q --filter="name=docker_glados_1") 
	docker rm $(shell docker ps -a -q --filter="name=docker_apache_openam_1")
	docker rm $(shell docker ps -a -q --filter="name=docker_glados_1")
docker-test: 
	docker-compose -p docker up -d
	sleep 5
	docker exec docker_glados_1 bash -c "rm -rf __pycache__;rm -rf tests/__pycache__; rm *.pyc; rm tests/*.pyc;./run-docker-tests.sh"; \
	status=$$?; \
	docker-compose kill; \
	docker-compose rm -f; \
	exit $$status
test:
	./run-docker-tests.sh
pylint:
	@-docker run artifactory.viasat.com:8091/twin_peaks/glados bash -c "pylint glados"
coverage:
	cd tests; GLADOS_CONFIG="testconfig.conf" coverage run --include "../*.py" ./tests.py; coverage report -m ../auth.py ../glados.py ../media_management.py ../profile_management.py ../user_management.py; cd ..
