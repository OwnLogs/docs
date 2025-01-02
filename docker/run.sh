#!/bin/bash

dockerfileLocation="$(dirname "$0")/docker-compose.yaml"

docker compose -f $dockerfileLocation up -d
