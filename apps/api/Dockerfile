# Simplified Dockerfile - uses pre-built artifacts from Turbo
FROM node:20-alpine AS runtime

WORKDIR /app

# Copy pre-built bundle from Turbo build
COPY apps/api/dist ./dist

# Copy migrations and config (prepared by GitHub Actions)
COPY apps/api/dist/migrations ./migrations
COPY apps/api/dist/database.config.js ./config/database.config.js

# Copy .sequelizerc directly from source (hidden files not in artifacts)
COPY apps/api/.sequelizerc ./.sequelizerc

# Copy entrypoint script
COPY apps/api/entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

# Install dependencies (sequelize + mysql2 + sequelize-cli for migrations)
RUN npm install sequelize@^6.35.2 mysql2@^3.6.5 sequelize-cli@^6.6.5 dotenv@^16.3.1

# Set environment
ENV NODE_ENV=production

# Expose port
EXPOSE 3001

# Run migrations then start application
CMD ["./entrypoint.sh"]
