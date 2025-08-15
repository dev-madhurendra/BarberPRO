# ---- Project config ----
APP_NAME := my-spring-app
JAR_FILE := target/$(APP_NAME).jar
PORT     := 8080
IMAGE    := $(APP_NAME):latest

MVN?=mvn

# ---- Default target ----
.PHONY: help
help:
	@echo "Usage:"
	@echo "  make build        - Clean and build the project (fast build)"
	@echo "  make clean        - Remove build artifacts"
	@echo "  make test         - Run unit tests"
	@echo "  make run          - Run the app from the built jar"
	@echo "  make dev          - Run the app via spring-boot:run (auto-reload if configured)"
	@echo "  make package      - Package jar with maven wrapper"
	@echo "  build-image      -  Building image based on  oci standard"


# ---- Build & test ----
.PHONY: build
build:
	${MVN} -q -DskipTests package

.PHONY: clean
clean:
	${MVN} -q clean

.PHONY: test
test:
	${MVN} -q test

.PHONY: package
package:
	${MVN} -q -DskipTests package

# ---- Run locally ----
# Ensure your pom builds a single executable JAR named $(APP_NAME).jar.
# You can set the finalName in pom.xml:
# <build><finalName>my-spring-app</finalName></build>
.PHONY: run
run: package
	java -jar $(JAR_FILE)

# Developer mode using spring-boot:run (no JAR required)
.PHONY: dev
dev:
	${MVN} -q spring-boot:run

.PHONY: build-image
build-image:
	${MVN} -q spring-boot:build-image


# Print Maven project version
.PHONY: version
version:
	${MVN} help:evaluate -Dexpression=project.version -q -DforceStdout

# Optional: code formatting if you use e.g. spotless or formatter plugin
.PHONY: fmt
fmt:

.PHONY: docker-run
docker-run:
	docker compose up

