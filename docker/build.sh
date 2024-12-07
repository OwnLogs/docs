#!/bin/bash

docker build -t ownlogs/docs -f $(dirname "$0")/../Dockerfile $(dirname "$0")/../
