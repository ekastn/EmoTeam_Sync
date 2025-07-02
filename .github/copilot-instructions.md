harus beracu pada file Emo Team.pdf yang telah saya kirim tadi.
buatkan kodenya yang simpel dan mudah dipahami.
gunakan tailwindcss untuk styling.
jangan pernah gunakan data dummy


User login/register → masuk dashboard.
User membuat/join tim → lihat/mengelola anggota tim.
User membuat/memulai sesi kolaborasi → sesi aktif.
Selama sesi, deteksi ekspresi wajah via webcam (face-api.js) → hasil dikirim ke backend.
Data emosi disimpan di backend → bisa diakses untuk analisis/report.
User bisa melihat riwayat sesi, statistik emosi, dan insight tim.

ini mysqlnya
-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 02 Jul 2025 pada 15.05
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `emoteam2`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `emotion_data`
--

CREATE TABLE `emotion_data` (
  `id` int(11) NOT NULL,
  `session_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `emotion` varchar(50) NOT NULL,
  `confidence` float NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `sessions`
--

CREATE TABLE `sessions` (
  `id` int(11) NOT NULL,
  `team_id` int(11) NOT NULL,
  `creator_id` int(11) NOT NULL,
  `start_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `end_time` timestamp NULL DEFAULT NULL,
  `status` varchar(20) DEFAULT 'active',
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `teams`
--

CREATE TABLE `teams` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `code` varchar(10) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `creator_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `teams`
--

INSERT INTO `teams` (`id`, `name`, `code`, `created_at`, `creator_id`) VALUES
(1, 'dsj', '6TQSEZ', '2025-06-19 04:38:02', 3),
(2, 'ghjjkj.l', '30J08Z', '2025-06-19 04:38:36', 3),
(3, 'abc', 'WZFXS5', '2025-06-19 04:40:09', 3),
(4, 'jhks', 'XW86ZW', '2025-06-19 04:40:41', 3),
(5, 'bdkaehl', 'RFV0F5', '2025-06-19 04:51:08', 4),
(6, 'efw', 'Q17GAB', '2025-06-23 20:30:26', 2),
(7, 'da,', 'PLYGA9', '2025-06-23 20:40:27', 2),
(8, 'ipa', '0P3L8M', '2025-06-23 20:41:44', 2),
(9, 'jkka', 'F982LD', '2025-06-23 20:48:14', 2),
(10, 'frfr', 'PSUNQW', '2025-06-23 20:49:03', 2),
(11, 'Tim Uji Coba', 'TIM-2514', '2025-06-23 21:29:19', 2),
(12, 'mtk', 'TIM-8442', '2025-06-23 21:30:00', 2),
(13, 'goni', 'TIM-2228', '2025-06-30 14:31:23', 3),
(14, 'ips', 'TIM-8937', '2025-06-30 14:42:53', 6),
(15, 'ipa', 'TIM-8464', '2025-07-01 04:02:04', 2),
(16, 'matematika', 'TIM-1735', '2025-07-01 04:08:00', 6),
(17, 'mtk', 'TIM-2090', '2025-07-02 12:13:04', 7);

-- --------------------------------------------------------

--
-- Struktur dari tabel `team_members`
--

CREATE TABLE `team_members` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `team_id` int(11) NOT NULL,
  `is_moderator` tinyint(1) DEFAULT 0,
  `joined_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` varchar(20) DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `team_members`
--

INSERT INTO `team_members` (`id`, `user_id`, `team_id`, `is_moderator`, `joined_at`, `status`) VALUES
(1, 3, 1, 1, '2025-06-19 04:38:02', 'online'),
(2, 3, 2, 1, '2025-06-19 04:38:36', 'online'),
(3, 3, 3, 1, '2025-06-19 04:40:09', 'online'),
(4, 3, 4, 1, '2025-06-19 04:40:41', 'online'),
(5, 4, 5, 1, '2025-06-19 04:51:08', 'active'),
(6, 2, 6, 1, '2025-06-23 20:30:26', 'offline'),
(7, 2, 7, 1, '2025-06-23 20:40:27', 'offline'),
(8, 2, 8, 1, '2025-06-23 20:41:44', 'offline'),
(9, 2, 9, 1, '2025-06-23 20:48:14', 'offline'),
(10, 2, 10, 1, '2025-06-23 20:49:03', 'offline'),
(11, 2, 11, 1, '2025-06-23 21:29:19', 'offline'),
(12, 2, 12, 1, '2025-06-23 21:30:00', 'offline'),
(13, 3, 12, 0, '2025-06-23 21:50:15', 'online'),
(14, 1, 12, 0, '2025-06-23 22:06:27', 'active'),
(15, 3, 13, 1, '2025-06-30 14:31:23', 'online'),
(16, 6, 14, 1, '2025-06-30 14:42:53', 'online'),
(17, 6, 13, 0, '2025-06-30 14:44:12', 'online'),
(18, 2, 15, 1, '2025-07-01 04:02:04', 'offline'),
(19, 6, 12, 0, '2025-07-01 04:05:58', 'online'),
(20, 6, 5, 0, '2025-07-01 04:06:48', 'online'),
(21, 6, 4, 0, '2025-07-01 04:07:05', 'online'),
(22, 6, 16, 1, '2025-07-01 04:08:00', 'online'),
(24, 7, 17, 1, '2025-07-02 12:13:04', 'offline'),
(25, 7, 16, 0, '2025-07-02 12:14:00', 'offline');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(20) NOT NULL DEFAULT 'member',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`id`, `nama`, `email`, `password`, `role`, `created_at`) VALUES
(1, 'Admin', 'admin@example.com', '$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'admin', '2025-06-19 03:57:37'),
(2, 'Admin User', 'admin@email.com', 'scrypt:32768:8:1$uT9qndlKeAJO4E5B$40957ab78127888fa2066f5b4859d744ace724eef5d4947a0f7be338809f2b565c4b1d772c7a4fceb71dc212d5727e9c80de1ad4c25c0057b30c91b4c637878a', 'admin', '2025-06-19 04:00:17'),
(3, 'cinnong', 'cinnong22@gmail.com', 'scrypt:32768:8:1$GWDWxNeiaPRlQL3J$90a67db1142f988cbfce20349aae259ca3e5b406854832bdf57350fc14087a137783b0bb4f339d37188a9d9a3eb9d6be5fc08a1a2284a77528bf4a100039f773', 'member', '2025-06-19 04:03:56'),
(4, 'donn', 'doni@gmail.com', 'scrypt:32768:8:1$bCjdC0fhPj5SU6fg$73c444ebc6969e2e55e36a9c57b472641fc5af194fb6e27a0d25c7242fc3f3fc1f2e57703f39155264c6980e357d07b09087c541853b8187a952db5d923b7ede', 'member', '2025-06-19 04:46:56'),
(5, 'siti', 'siti@gmail.com', 'scrypt:32768:8:1$ftFfB7b8vTdVxCcy$82eb63e567ed79ff9ddc73a341d9124ce8fbbab1c3b3f39506b23d2263e2c761b3662dbc7f6b6ccdde74f49d30b18278f72e40e73a1ed4af8d70d58f1bb55f7b', 'member', '2025-06-23 16:21:39'),
(6, 'budi', 'budi@gmail.com', 'scrypt:32768:8:1$qNuiII78T4eqC2cM$7bdcb48c60e60e0845489953495cabd797019cb040a9ae17c419db9ec27fa37db6aaed5eb540dcc85df8564bd7af37458201a1a28d6a0cb70951c13d0f9281e2', 'member', '2025-06-23 16:24:45'),
(7, 'gigi', 'gigi@gmail.com', 'scrypt:32768:8:1$eeXLhrJ97D7z44q4$80eaa55803bc9ee25c42560a975d076cb6a113c5ab023545a91e6676a830459a23558037fb6bd2bcee3d01d281f80e8b81d81e364968cdee5560242d117558ae', 'member', '2025-07-02 12:07:54');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `emotion_data`
--
ALTER TABLE `emotion_data`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_emotion_data_session` (`session_id`),
  ADD KEY `idx_emotion_data_user` (`user_id`);

--
-- Indeks untuk tabel `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `creator_id` (`creator_id`),
  ADD KEY `idx_sessions_team` (`team_id`);

--
-- Indeks untuk tabel `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`),
  ADD KEY `creator_id` (`creator_id`);

--
-- Indeks untuk tabel `team_members`
--
ALTER TABLE `team_members`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_team_member` (`user_id`,`team_id`),
  ADD KEY `idx_team_members_user` (`user_id`),
  ADD KEY `idx_team_members_team` (`team_id`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `emotion_data`
--
ALTER TABLE `emotion_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `sessions`
--
ALTER TABLE `sessions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `teams`
--
ALTER TABLE `teams`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT untuk tabel `team_members`
--
ALTER TABLE `team_members`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `emotion_data`
--
ALTER TABLE `emotion_data`
  ADD CONSTRAINT `emotion_data_ibfk_1` FOREIGN KEY (`session_id`) REFERENCES `sessions` (`id`),
  ADD CONSTRAINT `emotion_data_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Ketidakleluasaan untuk tabel `sessions`
--
ALTER TABLE `sessions`
  ADD CONSTRAINT `sessions_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`),
  ADD CONSTRAINT `sessions_ibfk_2` FOREIGN KEY (`creator_id`) REFERENCES `user` (`id`);

--
-- Ketidakleluasaan untuk tabel `teams`
--
ALTER TABLE `teams`
  ADD CONSTRAINT `teams_ibfk_1` FOREIGN KEY (`creator_id`) REFERENCES `user` (`id`);

--
-- Ketidakleluasaan untuk tabel `team_members`
--
ALTER TABLE `team_members`
  ADD CONSTRAINT `team_members_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `team_members_ibfk_2` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
