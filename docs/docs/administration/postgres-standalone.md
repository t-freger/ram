# Pre-existing Postgres

While not officially recommended, it is possible to run ram using a pre-existing Postgres server. To use this setup, you should have a baseline level of familiarity with Postgres and the Linux command line. If you do not have these, we recommend using the default setup with a dedicated Postgres container.

By default, ram expects superuser permission on the Postgres database and requires certain extensions to be installed. This guide outlines the steps required to prepare a pre-existing Postgres server to be used by ram.

:::tip
Running with a pre-existing Postgres server can unlock powerful administrative features, including logical replication and streaming write-ahead log backups using programs like pgBackRest or Barman.
:::

## Prerequisites

You must install pgvecto.rs into your instance of Postgres using their [instructions][vectors-install]. After installation, add `shared_preload_libraries = 'vectors.so'` to your `postgresql.conf`. If you already have some `shared_preload_libraries` set, you can separate each extension with a comma. For example, `shared_preload_libraries = 'pg_stat_statements, vectors.so'`.

:::note
ram is known to work with Postgres versions 14, 15, and 16. Earlier versions are unsupported.

Make sure the installed version of pgvecto.rs is compatible with your version of ram. For example, if your ram version uses the dedicated database image `tensorchord/pgvecto-rs:pg14-v0.2.1`, you must install pgvecto.rs `>= 0.2.1, < 0.3.0`.
:::

## Specifying the connection URL

You can connect to your pre-existing Postgres server by setting the `DB_URL` environment variable in the `.env` file.

```
DB_URL='postgresql://ramdbusername:ramdbpassword@postgreshost:postgresport/ramdatabasename'

# require a SSL connection to Postgres
# DB_URL='postgresql://ramdbusername:ramdbpassword@postgreshost:postgresport/ramdatabasename?sslmode=require'

# require a SSL connection, but don't enforce checking the certificate name
# DB_URL='postgresql://ramdbusername:ramdbpassword@postgreshost:postgresport/ramdatabasename?sslmode=require&sslmode=no-verify'
```

## With superuser permission

Typically ram expects superuser permission in the database, which you can grant by running `ALTER USER <ramdbusername> WITH SUPERUSER;` at the `psql` console. If you prefer not to grant superuser permissions, follow the instructions in the next section.

## Without superuser permission

:::caution
This method is recommended for **advanced users only** and often requires manual intervention when updating ram.
:::

ram can run without superuser permissions by following the below instructions at the `psql` prompt to prepare the database.

```sql title="Set up Postgres for ram"
CREATE DATABASE <ramdatabasename>;
\c <ramdatabasename>
BEGIN;
ALTER DATABASE <ramdatabasename> OWNER TO <ramdbusername>;
CREATE EXTENSION vectors;
CREATE EXTENSION earthdistance CASCADE;
ALTER DATABASE <ramdatabasename> SET search_path TO "$user", public, vectors;
ALTER SCHEMA vectors OWNER TO <ramdbusername>;
COMMIT;
```

### Updating pgvecto.rs

When installing a new version of pgvecto.rs, you will need to manually update the extension by connecting to the ram database and running `ALTER EXTENSION vectors UPDATE;`.

### Common errors

#### Permission denied for view

If you get the error `driverError: error: permission denied for view pg_vector_index_stat`, you can fix this by connecting to the ram database and running `GRANT SELECT ON TABLE pg_vector_index_stat TO <ramdbusername>;`.

[vectors-install]: https://docs.pgvecto.rs/getting-started/installation.html
