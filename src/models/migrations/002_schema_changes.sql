CREATE TABLE
  "db_details" (
    "api_key_id" UUID NOT NULL,
    "db_schemas_data" JSON NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "db_details_pkey" PRIMARY KEY ("api_key_id", "db_name", "db_host"),
    CONSTRAINT "db_details_api_key_id_fkey" FOREIGN KEY ("api_key_id") REFERENCES "api_key" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
  );

DROP INDEX "bp_boarding_time_idx";

ALTER TABLE "airlines"
RENAME COLUMN "coordinates" TO "coordinate";