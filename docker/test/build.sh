#!/bin/bash

docker build -t ownlogs/docs:staging -f $(dirname "$0")/../../Dockerfile $(dirname "$0")/../../
