#!/bin/sh
set -e

if [ ! -f .env ] && [ -f .env.example ]; then
  echo "📄 Creating .env from .env.example..."
  cp .env.example .env
fi

echo "🚀 Building Docker images..."
docker compose build --no-cache

echo "📦 Running database migrations..."
docker compose run --rm backend npm run migration:run

echo "✅ Starting backend and frontend..."
docker compose up -d

echo "🎉 Setup complete!"
