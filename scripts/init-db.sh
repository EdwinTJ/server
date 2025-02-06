#!/bin/bash

echo "Starting PostgreSQL service..."
sudo service postgresql start

echo "Creating database and user..."
sudo -u postgres psql << EOF
CREATE DATABASE salon_database;
CREATE USER admin1 WITH PASSWORD 'admin123';
GRANT ALL PRIVILEGES ON DATABASE salon_database TO admin1;
EOF

echo "Creating tables..."
sudo -u postgres psql salon_database << EOF
CREATE TABLE services (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    price DECIMAL NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    duration INTEGER NOT NULL,
    image VARCHAR(255)
);

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO admin1;
EOF

echo "Database initialization completed!"