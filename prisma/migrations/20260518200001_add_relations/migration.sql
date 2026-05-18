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
    "competition" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Entry" ("bonus_votes", "competition", "contact", "createdAt", "designerName", "entryId", "hook", "id", "imageUrl", "referral_votes", "setName", "status", "voteCount") SELECT "bonus_votes", "competition", "contact", "createdAt", "designerName", "entryId", "hook", "id", "imageUrl", "referral_votes", "setName", "status", "voteCount" FROM "Entry";
DROP TABLE "Entry";
ALTER TABLE "new_Entry" RENAME TO "Entry";
CREATE UNIQUE INDEX "Entry_entryId_key" ON "Entry"("entryId");
CREATE INDEX "Entry_competition_status_idx" ON "Entry"("competition", "status");
CREATE INDEX "Entry_competition_contact_idx" ON "Entry"("competition", "contact");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "notify_signups_competition_idx" ON "notify_signups"("competition");

-- CreateIndex
CREATE INDEX "votes_competition_idx" ON "votes"("competition");
