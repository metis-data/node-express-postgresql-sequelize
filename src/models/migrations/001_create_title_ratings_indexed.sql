DO $done$
  BEGIN
  
  IF NOT EXISTS (
      SELECT
      FROM pg_catalog.pg_tables 
      WHERE
          schemaname = 'imdb'
          AND tablename  = 'title_ratings_indexed'
  ) THEN
    CREATE TABLE imdb.title_ratings_indexed AS (SELECT * FROM imdb.title_ratings);
  
    CREATE INDEX title_ratings_idx ON imdb.title_ratings_indexed(averagerating);
  END IF;
  END;
$done$