FROM node:22-alpine
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Set the working directory
WORKDIR /usr/src/app

# Copy the application code and shared types
COPY . .

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build
RUN pnpm run build

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "build"]
