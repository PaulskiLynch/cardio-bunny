-- CreateTable
CREATE TABLE "demo_requests" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "message" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "loops" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'demo',
    "brand_name" TEXT NOT NULL,
    "retail_partner" TEXT NOT NULL DEFAULT '',
    "market" TEXT NOT NULL DEFAULT 'en',
    "hero_title" TEXT NOT NULL,
    "hero_subhead" TEXT NOT NULL,
    "cta_text" TEXT NOT NULL DEFAULT 'Submit Your Design',
    "deadline" TEXT NOT NULL DEFAULT '',
    "accent_color" TEXT NOT NULL DEFAULT '#e8325a',
    "logo_url" TEXT NOT NULL DEFAULT '',
    "hero_image_url" TEXT NOT NULL DEFAULT '',
    "brief" TEXT NOT NULL DEFAULT '',
    "guidelines" TEXT NOT NULL DEFAULT '[]',
    "prizes" TEXT NOT NULL DEFAULT '[]',
    "questions" TEXT NOT NULL DEFAULT '[]',
    "auto_approve" BOOLEAN NOT NULL DEFAULT false,
    "page_bg" TEXT NOT NULL DEFAULT '',
    "moderator_emails" TEXT NOT NULL DEFAULT '[]',
    "owner_email" TEXT NOT NULL DEFAULT '',
    "roster_enabled" BOOLEAN NOT NULL DEFAULT true,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "feedback_responses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "entry_id" TEXT NOT NULL,
    "competition" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "loopinquiry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "brandName" TEXT NOT NULL,
    "retailPartner" TEXT NOT NULL DEFAULT '',
    "productCategory" TEXT NOT NULL DEFAULT '',
    "market" TEXT NOT NULL DEFAULT '',
    "language" TEXT NOT NULL DEFAULT '',
    "brief" TEXT NOT NULL DEFAULT '',
    "prize" TEXT NOT NULL DEFAULT '',
    "campaignType" TEXT NOT NULL DEFAULT 'demo',
    "contactName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT 'new',
    "notes" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "notify_signups" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "competition" TEXT NOT NULL,
    "email" TEXT NOT NULL DEFAULT '',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "votes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "entry_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "competition" TEXT NOT NULL,
    "is_referral" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "partner_applications" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "competition" TEXT NOT NULL DEFAULT '',
    "handle" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "specialty" TEXT NOT NULL DEFAULT '',
    "role" TEXT NOT NULL,
    "reach" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "portfolio_url" TEXT NOT NULL DEFAULT '',
    "avatar_url" TEXT NOT NULL DEFAULT '',
    "followers" TEXT NOT NULL DEFAULT '',
    "engagement" TEXT NOT NULL DEFAULT '',
    "location" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT 'new',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Entry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "entryId" TEXT NOT NULL,
    "designerName" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "setName" TEXT NOT NULL,
    "hook" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "voteCount" INTEGER NOT NULL DEFAULT 0,
    "referral_votes" INTEGER NOT NULL DEFAULT 0,
    "bonus_votes" INTEGER NOT NULL DEFAULT 0,
    "competition" TEXT NOT NULL DEFAULT 'biedronka',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Entry" ("contact", "createdAt", "designerName", "entryId", "hook", "id", "imageUrl", "setName", "status", "voteCount") SELECT "contact", "createdAt", "designerName", "entryId", "hook", "id", "imageUrl", "setName", "status", "voteCount" FROM "Entry";
DROP TABLE "Entry";
ALTER TABLE "new_Entry" RENAME TO "Entry";
CREATE UNIQUE INDEX "Entry_entryId_key" ON "Entry"("entryId");
CREATE INDEX "Entry_competition_status_idx" ON "Entry"("competition", "status");
CREATE INDEX "Entry_competition_contact_idx" ON "Entry"("competition", "contact");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "loops_slug_key" ON "loops"("slug");

-- CreateIndex
CREATE INDEX "feedback_responses_entry_id_idx" ON "feedback_responses"("entry_id");

-- CreateIndex
CREATE UNIQUE INDEX "notify_signups_competition_email_key" ON "notify_signups"("competition", "email");

-- CreateIndex
CREATE UNIQUE INDEX "votes_entry_id_user_id_key" ON "votes"("entry_id", "user_id");
