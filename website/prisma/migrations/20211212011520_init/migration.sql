-- CreateEnum
CREATE TYPE "ExtraInfoType" AS ENUM ('BOOL', 'STRING', 'NUMBER');

-- CreateTable
CREATE TABLE "Mod" (
    "modID" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Mod_pkey" PRIMARY KEY ("modID")
);

-- CreateTable
CREATE TABLE "Song" (
    "songID" SERIAL NOT NULL,
    "modID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "internalName" TEXT NOT NULL,
    "iconName" TEXT NOT NULL,

    CONSTRAINT "Song_pkey" PRIMARY KEY ("songID")
);

-- CreateTable
CREATE TABLE "Diff" (
    "diffID" SERIAL NOT NULL,
    "songID" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "internalNumber" INTEGER NOT NULL,
    "maxScore" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Diff_pkey" PRIMARY KEY ("diffID")
);

-- CreateTable
CREATE TABLE "Score" (
    "scoreID" UUID NOT NULL,
    "userID" UUID NOT NULL,
    "diffID" INTEGER NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "score" INTEGER NOT NULL,
    "pass" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("scoreID")
);

-- CreateTable
CREATE TABLE "ExtraInfo" (
    "extraInfoID" SERIAL NOT NULL,
    "modID" TEXT NOT NULL,
    "internalName" TEXT NOT NULL,
    "valueType" "ExtraInfoType" NOT NULL,

    CONSTRAINT "ExtraInfo_pkey" PRIMARY KEY ("extraInfoID")
);

-- CreateTable
CREATE TABLE "UserExtraInfo" (
    "userExtraInfoID" SERIAL NOT NULL,
    "userID" UUID NOT NULL,
    "extraInfoID" INTEGER NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "UserExtraInfo_pkey" PRIMARY KEY ("userExtraInfoID")
);

-- CreateTable
CREATE TABLE "GlobalSetting" (
    "globalSettingID" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "GlobalSetting_pkey" PRIMARY KEY ("globalSettingID")
);

-- CreateTable
CREATE TABLE "UserGlobalSetting" (
    "userGlobalSettingID" SERIAL NOT NULL,
    "userID" UUID NOT NULL,
    "globalSettingID" INTEGER NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "UserGlobalSetting_pkey" PRIMARY KEY ("userGlobalSettingID")
);

-- CreateTable
CREATE TABLE "GlobalSettingMap" (
    "globalSettingMapID" SERIAL NOT NULL,
    "globalSettingID" INTEGER NOT NULL,
    "modID" TEXT NOT NULL,
    "internalName" TEXT NOT NULL,

    CONSTRAINT "GlobalSettingMap_pkey" PRIMARY KEY ("globalSettingMapID")
);

-- CreateTable
CREATE TABLE "Setting" (
    "settingID" SERIAL NOT NULL,
    "modID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "internalName" TEXT NOT NULL,

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("settingID")
);

-- CreateTable
CREATE TABLE "UserSetting" (
    "userSettingID" SERIAL NOT NULL,
    "userID" UUID NOT NULL,
    "settingID" INTEGER NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "UserSetting_pkey" PRIMARY KEY ("userSettingID")
);

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_modID_fkey" FOREIGN KEY ("modID") REFERENCES "Mod"("modID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diff" ADD CONSTRAINT "Diff_songID_fkey" FOREIGN KEY ("songID") REFERENCES "Song"("songID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_diffID_fkey" FOREIGN KEY ("diffID") REFERENCES "Diff"("diffID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExtraInfo" ADD CONSTRAINT "ExtraInfo_modID_fkey" FOREIGN KEY ("modID") REFERENCES "Mod"("modID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserExtraInfo" ADD CONSTRAINT "UserExtraInfo_extraInfoID_fkey" FOREIGN KEY ("extraInfoID") REFERENCES "ExtraInfo"("extraInfoID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGlobalSetting" ADD CONSTRAINT "UserGlobalSetting_globalSettingID_fkey" FOREIGN KEY ("globalSettingID") REFERENCES "GlobalSetting"("globalSettingID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GlobalSettingMap" ADD CONSTRAINT "GlobalSettingMap_globalSettingID_fkey" FOREIGN KEY ("globalSettingID") REFERENCES "GlobalSetting"("globalSettingID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GlobalSettingMap" ADD CONSTRAINT "GlobalSettingMap_modID_fkey" FOREIGN KEY ("modID") REFERENCES "Mod"("modID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Setting" ADD CONSTRAINT "Setting_modID_fkey" FOREIGN KEY ("modID") REFERENCES "Mod"("modID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSetting" ADD CONSTRAINT "UserSetting_settingID_fkey" FOREIGN KEY ("settingID") REFERENCES "Setting"("settingID") ON DELETE RESTRICT ON UPDATE CASCADE;
