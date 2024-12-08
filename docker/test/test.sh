#!/bin/bash

bash "$(dirname "$0")/build.sh"

dockerfileLocation="$(dirname "$0")/docker-compose.test.yaml"

docker compose -f $dockerfileLocation up --remove-orphans
