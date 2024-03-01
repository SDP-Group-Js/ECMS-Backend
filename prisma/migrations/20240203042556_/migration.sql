-- CreateTable
CREATE TABLE `PublicUser` (
    `id` VARCHAR(191) NOT NULL,
    `nic` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `PublicUser_nic_key`(`nic`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `officeId` VARCHAR(191) NOT NULL,
    `userRole` ENUM('SystemAdmin', 'OfficeAdmin', 'ComplaintHandler', 'InvestigationHandler', 'Viewer', 'FieldOfficer') NOT NULL,

    INDEX `User_officeId_idx`(`officeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Complaint` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `complaint_title` VARCHAR(191) NULL,
    `complaint_description` VARCHAR(191) NULL,
    `complainerId` VARCHAR(191) NULL,
    `institutionId` VARCHAR(191) NULL,

    INDEX `Complaint_complainerId_idx`(`complainerId`),
    INDEX `Complaint_institutionId_idx`(`institutionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Institution` (
    `id` VARCHAR(191) NOT NULL,
    `officeId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Institution_officeId_key`(`officeId`),
    INDEX `Institution_officeId_idx`(`officeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Division` (
    `id` VARCHAR(191) NOT NULL,
    `institutionId` VARCHAR(191) NULL,
    `officeId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Division_officeId_key`(`officeId`),
    INDEX `Division_officeId_idx`(`officeId`),
    INDEX `Division_institutionId_idx`(`institutionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Branch` (
    `id` VARCHAR(191) NOT NULL,
    `divisionId` VARCHAR(191) NULL,
    `officeId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Branch_officeId_key`(`officeId`),
    INDEX `Branch_officeId_idx`(`officeId`),
    INDEX `Branch_divisionId_idx`(`divisionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BeatOffice` (
    `id` VARCHAR(191) NOT NULL,
    `branchId` VARCHAR(191) NULL,
    `officeId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `BeatOffice_officeId_key`(`officeId`),
    INDEX `BeatOffice_officeId_idx`(`officeId`),
    INDEX `BeatOffice_branchId_idx`(`branchId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Office` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Workflow` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `stages` JSON NULL,
    `officeId` VARCHAR(191) NULL,

    INDEX `Workflow_officeId_idx`(`officeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Investigation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` ENUM('NotAssigned', 'Ongoing', 'Completed') NOT NULL DEFAULT 'NotAssigned',
    `description` VARCHAR(191) NULL,
    `complaintId` INTEGER NOT NULL,
    `officeId` VARCHAR(191) NULL,
    `institutionWorkflowId` INTEGER NULL,

    UNIQUE INDEX `Investigation_complaintId_key`(`complaintId`),
    INDEX `Investigation_officeId_idx`(`officeId`),
    INDEX `Investigation_institutionWorkflowId_idx`(`institutionWorkflowId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InvestigationStage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `stageName` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `conclusion` VARCHAR(191) NULL,
    `order` INTEGER NOT NULL,
    `tasks` JSON NULL,
    `investigationId` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'Ongoing',
    `officeId` VARCHAR(191) NULL,

    INDEX `InvestigationStage_investigationId_idx`(`investigationId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Action` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `investigationStageId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NULL,

    INDEX `Action_investigationStageId_idx`(`investigationStageId`),
    INDEX `Action_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_InvolvedInvestigation` (
    `A` INTEGER NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_InvolvedInvestigation_AB_unique`(`A`, `B`),
    INDEX `_InvolvedInvestigation_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_InvestigationStageToUser` (
    `A` INTEGER NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_InvestigationStageToUser_AB_unique`(`A`, `B`),
    INDEX `_InvestigationStageToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
