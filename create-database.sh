#!/bin/bash

# Create learning-portal database
# Run this script to set up the database for the application

echo "Creating learning-portal database..."

/usr/local/Cellar/postgresql@15/15.14/bin/psql -U postgres -c "CREATE DATABASE \"learning-portal\";" 2>&1

if [ $? -eq 0 ]; then
    echo "✅ Database 'learning-portal' created successfully!"
else
    echo "⚠️  Database might already exist or there was an error"
    echo "Checking if database exists..."
    /usr/local/Cellar/postgresql@15/15.14/bin/psql -U postgres -c "\l" | grep learning-portal
fi

echo ""
echo "Database setup complete!"
echo ""
echo "Now you can run the application with:"
echo "  cd backend"
echo "  mvn spring-boot:run"
