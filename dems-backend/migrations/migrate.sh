#!/bin/bash
echo "🚀 Running database migrations..."
psql -d dems -f migrations/init.sql
echo "✅ Migration complete!"
