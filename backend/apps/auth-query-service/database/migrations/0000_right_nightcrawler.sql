CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"googleId" text NOT NULL,
	"role" text NOT NULL
);
