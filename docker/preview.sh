#!/bin/bash

bash "$(dirname "$0")/set-env.sh"

dockerfileLocation="$(dirname "$0")/docker-compose.yaml"

docker compose -f $dockerfileLocation up
