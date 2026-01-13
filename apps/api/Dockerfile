# Simplified Dockerfile - uses pre-built artifacts from Turbo
FROM node:20-alpine AS runtime

WORKDIR /app

# Copy pre-built bundle from Turbo build
COPY apps/api/dist ./dist

# Set environment
ENV NODE_ENV=production

# Expose port
EXPOSE 3001

# Start application
CMD ["node", "dist/index.js"]
