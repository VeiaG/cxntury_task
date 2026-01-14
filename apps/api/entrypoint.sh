#!/bin/sh
set -e

echo "🔄 Running database migrations..."

# Run migrations
npx sequelize-cli db:migrate

if [ $? -eq 0 ]; then
  echo "✅ Migrations completed successfully"
else
  echo "❌ Migrations failed!"
  exit 1
fi

echo "🚀 Starting API server..."
exec node dist/index.js
