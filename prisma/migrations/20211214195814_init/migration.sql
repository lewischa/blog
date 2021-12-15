-- CreateTable
CREATE TABLE `BlogViews` (
    `slug` VARCHAR(255) NOT NULL,
    `views` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `BlogViews_slug_key`(`slug`),
    PRIMARY KEY (`slug`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
