#!/bin/bash

# Function to add colored prefix
prefix_output() {
  local color="$1"
  local prefix="$2"
  while IFS= read -r line; do
    echo -e "${color}${prefix}\033[0m ${line}"
  done
}

options=(
  "dev"
  "format"
  "build"
  "docker preview dev"
  "docker build prod"
  "docker preview prod"
  "docker push"
  "docker run prod"
)

for i in ${!options[@]}; do
  echo "[$i] ${options[$i]}"
done

# Choice
read -p "Choose an option: " choice

case $choice in
  0)
    # Start the dev server
    pnpm dev
    ;;
  1)
    # Format the code
    pnpm format
    ;;
  2)
    # Build the code
    pnpm build
    ;;
  3)
    # Test the code in a Docker container
    ./docker/test/test.sh
    ;;
  4)
    # Build prod
    ./docker/build.sh
    ;;
  5)
    # Push the Docker image to the registry
    ./docker/preview.sh
    ;;
  6)
    # Push the Docker image to the registry
    ./docker/build.sh
    ./docker/push.sh
    ;;
  7)
    # Run the prod server
    ./docker/run.sh
    ;;
  *)
    echo "Invalid option"
    ;;
esac
