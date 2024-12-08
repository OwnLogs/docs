#!/bin/bash

docker build -t ownlogs/docs:latest -f $(dirname "$0")/../Dockerfile $(dirname "$0")/../
