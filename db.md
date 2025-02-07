# DB

## PostgreSQL

postgres=# CREATE USER admin1 WITH PASSWORD 'admin123';

To run the DB when developing:

1. Open a terminal and run the following command:

```bash

sudo service postgresql start

```

2. Open another terminal and run the following command:

```bash

sudo -u postgres psql

```

3. Run the following command to connect to the database:

```bash
createdb salon_database
```

4. Run the following command to Access PostgreSQL CLI/connect to the database:

```bash
psql or psql salon_database
```

5. Run the following command to create the tables:

```bash
CREATE TABLE services (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    price DECIMAL NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    duration INTEGER NOT NULL,
    image VARCHAR(255)
);

CREATE USER admin1 WITH PASSWORD 'admin123';
GRANT ALL PRIVILEGES ON DATABASE salon_database TO admin1;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO admin1;
\q
```

## Helping Commands

```bash

\dt    -- Lists all tables
\d services    -- Shows table structure
\q    -- Quits the PostgreSQL CLI
SELECT * FROM services;    -- Shows all rows in the services table
\l   -- Lists all databases
\c salon_database    -- Connects to the salon_database
```

## Check DB still running

The PostgreSQL database server runs as a background service on your system. It remains active until you explicitly stop it with:

```bash
sudo service postgresql stop
```

You can verify the PostgreSQL service status anytime with:

```bash
sudo service postgresql status
```

## Use scripts to initialize the database

1. Initialize the database with the following command:

```bash
npm run init-db
```

2. Seed the database with the following command:

```bash
npm run seed-db
```

3. Do both with the following command:

```bash
npm run setup-db
```

4. To verify the setup:

```bash
sudo -u postgres psql salon_database
```

### Remeber

1. Make the init scrhit executable:

```bash
chmod +x scripts/init-db.sh
```

2. Ensure you have ts-node installed for the seed script:

```bash
npm install -D ts-node
```

## Start and Finish Development

1. Start the database:

```bash
# Start the PostgreSQL service
sudo service postgresql start
```

2. Finish the database:

```bash
# Stop the PostgreSQL service
sudo service postgresql stop
```

chmod +x tmux_script.sh
./tmux_script.sh

When creating a new table the user must have the following permissions:

```sql
GRANT USAGE, SELECT ON SEQUENCE stylists_id_seq TO admin1;
```
