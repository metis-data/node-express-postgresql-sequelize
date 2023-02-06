const creds = {
  development: {
    username: "postgres",
    password: "postgres",
    database: "demo",
    host: "localhost",
    dialect: 'postgres',
    port: "5432"
  },
  test: {
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    dialect: 'postgres',
    port: process.env.PGPORT
  },
  production: {
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    dialect: 'postgres',
    port: process.env.PGPORT
  },
};

module.exports = creds;
