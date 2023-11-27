CREATE TABLE IF NOT EXISTS imdb.title_ratings_indexed123 AS (SELECT * FROM imdb.title_ratings);
CREATE INDEX IF NOT EXISTS title_ratings_idx4 ON imdb.title_ratings_indexed(averagerating);