-- Buat database
CREATE DATABASE IF NOT EXISTS emoteam2;
USE emoteam2;

-- Tabel user
CREATE TABLE IF NOT EXISTS `user` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `nama` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) UNIQUE NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` VARCHAR(20) NOT NULL DEFAULT 'member',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel teams
CREATE TABLE IF NOT EXISTS `teams` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `code` VARCHAR(10) UNIQUE NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `creator_id` INT NOT NULL,
    FOREIGN KEY (`creator_id`) REFERENCES `user`(`id`)
);

-- Tabel team_members
CREATE TABLE IF NOT EXISTS `team_members` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `team_id` INT NOT NULL,
    `is_moderator` BOOLEAN DEFAULT FALSE,
    `joined_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `status` VARCHAR(20) DEFAULT 'active',
    FOREIGN KEY (`user_id`) REFERENCES `user`(`id`),
    FOREIGN KEY (`team_id`) REFERENCES `teams`(`id`),
    UNIQUE KEY `unique_team_member` (`user_id`, `team_id`)
);

-- Tabel sessions
CREATE TABLE IF NOT EXISTS `sessions` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `team_id` INT NOT NULL,
    `creator_id` INT NOT NULL,
    `start_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `end_time` TIMESTAMP NULL,
    `status` VARCHAR(20) DEFAULT 'active',
    `title` VARCHAR(255),
    `description` TEXT,
    FOREIGN KEY (`team_id`) REFERENCES `teams`(`id`),
    FOREIGN KEY (`creator_id`) REFERENCES `user`(`id`)
);

-- Tabel emotion_data
CREATE TABLE IF NOT EXISTS `emotion_data` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `session_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    `emotion` VARCHAR(50) NOT NULL,
    `confidence` FLOAT NOT NULL,
    `timestamp` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`session_id`) REFERENCES `sessions`(`id`),
    FOREIGN KEY (`user_id`) REFERENCES `user`(`id`)
);

-- Buat user admin default
-- Password: admin123 (akan di-hash oleh aplikasi)
INSERT IGNORE INTO `user` (`nama`, `email`, `password`, `role`) 
VALUES ('Admin', 'admin@example.com', '$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'admin');

-- Tambahkan index untuk performa query
CREATE INDEX idx_emotion_data_session ON emotion_data(session_id);
CREATE INDEX idx_emotion_data_user ON emotion_data(user_id);
CREATE INDEX idx_team_members_user ON team_members(user_id);
CREATE INDEX idx_team_members_team ON team_members(team_id);
CREATE INDEX idx_sessions_team ON sessions(team_id);
