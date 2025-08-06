/*
  Warnings:

  - You are about to drop the column `password` on the `clients` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_clients" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "dataNascimento" DATETIME NOT NULL,
    "CPF" TEXT NOT NULL,
    "proximoAgendamento" DATETIME NOT NULL,
    "descricao" TEXT NOT NULL,
    "fotoAntes" TEXT NOT NULL,
    "fotoDepois" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_clients" ("CPF", "createdAt", "dataNascimento", "descricao", "email", "endereco", "fotoAntes", "fotoDepois", "id", "name", "proximoAgendamento", "updatedAt") SELECT "CPF", "createdAt", "dataNascimento", "descricao", "email", "endereco", "fotoAntes", "fotoDepois", "id", "name", "proximoAgendamento", "updatedAt" FROM "clients";
DROP TABLE "clients";
ALTER TABLE "new_clients" RENAME TO "clients";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
