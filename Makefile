SHELL = /bin/bash

MIN_DOCKER_CLIENT_VERSION = 17.03
MIN_DOCKER_SERVER_VERSION = 17.03

.PHONY: build run stop clean

all: prerequisites build run

build:
	docker build -t ebot7-recruit .

run:
	docker run -d --restart=always --name=ebot7-recruit \
		-p 8380:80 \
		-v $(CURDIR)/srv/src:/app/srv/src \
		-v $(CURDIR)/web/src:/app/web/src \
		ebot7-recruit

clean:
	@echo -n "Are you sure [yN]? " \
		&& read ans && [ $$ans == y ]
	docker stop ebot7-recruit
	docker rm ebot7-recruit
	docker rmi ebot7-recruit

# Check docker version
prerequisites:
	@if [[ "$$(docker version -f '{{.Server.Version}}')" < \
		"$(MIN_DOCKER_SERVER_VERSION)" ]]; \
		then echo 'Docker server version $(MIN_DOCKER_SERVER_VERSION) needed.'; \
		exit 2; fi
	@if [[ "$$(docker version -f '{{.Client.Version}}')" < \
		"$(MIN_DOCKER_CLIENT_VERSION)" ]]; \
		then echo 'Docker client version $(MIN_DOCKER_CLIENT_VERSION) needed.'; \
		exit 2; fi

