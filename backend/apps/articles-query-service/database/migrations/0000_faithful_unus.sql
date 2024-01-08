CREATE TABLE IF NOT EXISTS "tags" (
	"tag" text NOT NULL,
	"articleId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "articles" (
	"id" uuid NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"payload" text NOT NULL,
	"likeAmount" smallint DEFAULT 0,
	"dislikeAmout" smallint DEFAULT 0,
	"previewImageLink" text NOT NULL,
	"previewSlice" smallint NOT NULL,
	"estimatedReadTime" smallint DEFAULT 1
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "userBookmarks" (
	"userId" uuid,
	"articleId" uuid
);
