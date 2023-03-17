DO $done$
  BEGIN
  
  IF NOT EXISTS (
      SELECT
      FROM pg_catalog.pg_tables 
      WHERE
          schemaname = 'bookings'
          AND tablename  = 'flights_indexed'
  ) THEN
    CREATE TABLE flights_indexed AS (SELECT * FROM flights);
  
    CREATE INDEX departure_aiport_idx ON flights_indexed(departure_airport);
  END IF;
  END;
$done$