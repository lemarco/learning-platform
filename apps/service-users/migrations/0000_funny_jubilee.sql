DO $$ BEGIN
 CREATE TYPE "role" AS ENUM('ADMIN', 'USER');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"image" varchar,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"string" varchar,
	"role" "role" DEFAULT 'USER' NOT NULL,
	"locale" varchar,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
