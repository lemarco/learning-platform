CREATE TABLE IF NOT EXISTS "auth_events" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"version" smallint,
	"causationId" uuid,
	"timestamp" timestamp DEFAULT now(),
	"payload" jsonb
);
