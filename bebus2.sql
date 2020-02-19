-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 19 Feb 2020 pada 14.48
-- Versi server: 10.1.38-MariaDB
-- Versi PHP: 7.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bebus`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `booking`
--

CREATE TABLE `booking` (
  `booking_id` int(11) NOT NULL,
  `booking_number` int(11) NOT NULL,
  `booking_seat_number` int(11) NOT NULL,
  `booking_user_id` int(11) NOT NULL,
  `booking_schedule_id` int(11) NOT NULL,
  `booking_status` enum('UNPAID','PENDING','PAID','FAILED','CHALLENGE') NOT NULL DEFAULT 'UNPAID',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `booking`
--

INSERT INTO `booking` (`booking_id`, `booking_number`, `booking_seat_number`, `booking_user_id`, `booking_schedule_id`, `booking_status`, `created_at`) VALUES
(1, 1, 1, 1, 1, 'PAID', '2020-02-19 02:32:33'),
(2, 321, 2, 1, 1, 'PAID', '2020-02-19 02:32:33'),
(3, 3367264, 2, 1, 2, 'PENDING', '2020-02-19 02:32:33'),
(4, 1163631, 3, 1, 2, 'PAID', '2020-02-19 02:32:33'),
(5, 3996640, 4, 1, 2, 'PAID', '2020-02-19 02:32:33'),
(6, 1735029, 4, 1, 1, 'UNPAID', '2020-02-19 02:32:33'),
(7, 123, 1, 1, 1, 'UNPAID', '2020-02-19 02:32:33'),
(8, 4444, 79, 1, 1, 'PAID', '2020-02-19 02:34:17');

-- --------------------------------------------------------

--
-- Struktur dari tabel `bus`
--

CREATE TABLE `bus` (
  `bus_id` int(11) NOT NULL,
  `bus_name` varchar(100) NOT NULL,
  `bus_capacity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `bus`
--

INSERT INTO `bus` (`bus_id`, `bus_name`, `bus_capacity`) VALUES
(1, 'Harapan Jaya', 10),
(2, 'Suka Maju', 36),
(3, 'Harapan Indah', 36),
(4, 'Harapan Jaya', 36),
(5, 'Harapan Jaya', 36),
(6, 'Harapan Indah', 36),
(7, 'Harapan Indah', 36),
(8, 'Harapan Indah', 36),
(9, 'Salembur', 36),
(10, 'Kramat Jati', 36),
(11, 'Harapan Cinta', 36),
(12, 'Sumber Selamat', 36),
(13, 'Harapan Indah', 36),
(14, 'Indah Harapan', 36),
(15, 'Agra Indah', 36),
(16, 'Tirta Indah', 36),
(17, 'Agra Selamat', 36),
(18, 'Harapan Indah', 36),
(19, 'Harapan Indah', 36),
(20, 'Tirta Wangi', 36),
(21, 'Hampura', 36),
(22, 'Harapan Keramat', 36),
(23, 'Indah Jaya', 36),
(24, 'Harapan Indah', 36),
(25, 'Indah Cinta', 36),
(26, 'Indah Jahad', 36),
(27, 'Indah Tirta', 36),
(28, 'Gatotkaca', 36),
(29, 'Semar', 36),
(30, 'Petruk', 36),
(31, 'Sumber Keramat', 36);

-- --------------------------------------------------------

--
-- Struktur dari tabel `city`
--

CREATE TABLE `city` (
  `city_id` int(11) NOT NULL,
  `city_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `city`
--

INSERT INTO `city` (`city_id`, `city_name`) VALUES
(1, 'Bogor'),
(2, 'Solo'),
(3, 'Jakarta'),
(4, 'Tangerang'),
(5, 'Bekasi'),
(6, 'Depok'),
(7, 'Blitar'),
(8, 'Yogyakarta'),
(9, 'Gunung Kidul'),
(10, 'Surabaya');

-- --------------------------------------------------------

--
-- Struktur dari tabel `schedule`
--

CREATE TABLE `schedule` (
  `schedule_id` int(11) NOT NULL,
  `schedule_departure_station_id` int(11) NOT NULL,
  `schedule_arrival_station_id` int(11) NOT NULL,
  `schedule_price` int(11) NOT NULL,
  `schedule_departure_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `schedule_arrival_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `schedule_bus_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `schedule`
--

INSERT INTO `schedule` (`schedule_id`, `schedule_departure_station_id`, `schedule_arrival_station_id`, `schedule_price`, `schedule_departure_time`, `schedule_arrival_time`, `schedule_bus_id`) VALUES
(1, 1, 2, 200000, '2020-02-15 12:43:16', '2020-02-16 23:43:16', 1),
(2, 1, 2, 200000, '2020-02-16 00:00:00', '2020-02-17 23:00:01', 1),
(3, 1, 2, 200000, '2020-02-20 08:00:00', '2020-02-21 17:00:00', 2),
(4, 3, 2, 200000, '2020-02-21 08:00:00', '2020-02-22 04:00:00', 0),
(5, 1, 2, 200000, '2020-02-20 08:00:00', '2020-02-21 17:00:00', 2),
(6, 3, 2, 200000, '2020-02-21 08:00:00', '2020-02-22 04:00:00', 3),
(7, 3, 7, 250000, '2020-02-20 09:00:00', '2020-02-17 23:00:00', 5),
(8, 7, 3, 250000, '2020-02-21 16:00:00', '2020-02-22 12:00:00', 7),
(9, 4, 8, 200000, '2020-02-21 10:00:00', '2020-02-22 00:00:00', 9),
(10, 4, 9, 250000, '2020-02-20 08:00:00', '2020-02-21 23:00:00', 10),
(11, 4, 10, 200000, '2020-02-21 16:00:00', '2020-02-22 08:00:00', 20),
(12, 10, 3, 250000, '2020-02-20 09:00:00', '2020-02-21 18:00:00', 21),
(13, 5, 9, 200000, '2020-02-21 15:00:00', '2020-02-22 08:00:00', 25),
(14, 9, 1, 200000, '2020-02-22 10:00:00', '2020-02-23 00:00:00', 12),
(15, 10, 6, 250000, '2020-02-23 10:00:00', '2020-02-24 08:00:00', 18),
(16, 10, 1, 300000, '2020-02-23 08:00:00', '2020-02-24 18:00:00', 3),
(17, 1, 10, 280000, '2020-02-23 11:00:00', '2020-02-24 00:00:00', 4),
(18, 3, 9, 279000, '2020-02-22 09:00:00', '2020-02-23 04:00:00', 5),
(19, 5, 7, 290000, '2020-02-22 08:00:00', '2020-02-23 09:00:00', 22),
(20, 0, 7, 1, '2020-02-21 08:00:00', '2020-02-22 10:00:00', 5),
(21, 5, 7, 290000, '2020-02-22 08:00:00', '2020-02-23 09:00:00', 22),
(22, 7, 5, 300000, '2020-02-21 08:00:00', '2020-02-22 10:00:00', 5);

-- --------------------------------------------------------

--
-- Struktur dari tabel `seat`
--

CREATE TABLE `seat` (
  `seat_id` int(11) NOT NULL,
  `seat_number` int(11) NOT NULL,
  `seat_booking_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `station`
--

CREATE TABLE `station` (
  `station_id` int(11) NOT NULL,
  `station_city_id` int(11) NOT NULL,
  `station_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `station`
--

INSERT INTO `station` (`station_id`, `station_city_id`, `station_name`) VALUES
(1, 1, 'Bogor station'),
(2, 1, 'Cimahi'),
(3, 2, 'Solo Baru'),
(4, 2, 'Solo Lama'),
(5, 2, 'Sukoharjo'),
(6, 3, 'Branang Siang'),
(7, 3, 'Blok M'),
(8, 3, 'Pasar Minggu'),
(9, 4, 'BSD'),
(10, 4, 'Pasar Modern'),
(11, 5, 'Banjir Kanal Timur'),
(12, 5, 'Pondok Gede'),
(13, 6, 'Depok Baru'),
(14, 6, 'Depok Lama'),
(15, 7, 'Bongkok'),
(16, 8, 'Malioboro'),
(17, 8, 'Lempuyangan'),
(18, 9, 'Kweni'),
(19, 10, 'Surabaya Station');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_phone` varchar(15) DEFAULT NULL,
  `user_username` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_photo` varchar(255) DEFAULT NULL,
  `reset_key` varchar(255) DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fcm_token` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`user_id`, `user_name`, `user_email`, `user_phone`, `user_username`, `user_password`, `user_photo`, `reset_key`, `updated_at`, `fcm_token`) VALUES
(1, 'Admin', 'admin@admin', NULL, 'admin', '$2a$04$n7azIK7y1cR818Fe9WfwKe4aEi.MXisDxsntFc2zHJXUug18c/l.6', '1581763586831.PNG', '', '2020-02-19 08:14:32', NULL),
(3, 'Admin', 'admin@admin10', NULL, 'admin10', '$2a$04$OM09Wx9WJCscBVjOK9X0dOXeqThpTvMTC5.trCwTytm2.rtPhROl.', NULL, '', '2020-02-19 08:14:32', NULL),
(5, 'Admin', 'admin@admin11', NULL, 'admin11', '$2a$04$e88L5qZINoUHKqqglduGS.41e/qJD4yJWl4j6WsYfZRInOXy3xBmO', NULL, '', '2020-02-19 08:14:32', NULL),
(6, 'Admin', 'admin@adminx', NULL, 'adminx', '$2a$04$yzg7h9pzgaPcLU.Aqj1YSOly73wzQwDc70LK9iKjL8ujDqv9cs6Om', NULL, '', '2020-02-19 08:14:32', NULL),
(7, 'budianto', 'ronibudianto361@gmail.com', '1234567890', 'budianto', '$2a$04$3fAZtgMF0.me5lmnid21teDsGvnSB2DfTZtBoqwvvEkPYNuQpSUI6', NULL, '1462', '2020-02-19 09:35:03', NULL),
(8, '123', '213', '1231', '1312', '1312', '1312', NULL, '2020-02-19 08:28:54', NULL);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`booking_id`);

--
-- Indeks untuk tabel `bus`
--
ALTER TABLE `bus`
  ADD PRIMARY KEY (`bus_id`);

--
-- Indeks untuk tabel `city`
--
ALTER TABLE `city`
  ADD PRIMARY KEY (`city_id`);

--
-- Indeks untuk tabel `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`schedule_id`);

--
-- Indeks untuk tabel `seat`
--
ALTER TABLE `seat`
  ADD PRIMARY KEY (`seat_id`);

--
-- Indeks untuk tabel `station`
--
ALTER TABLE `station`
  ADD PRIMARY KEY (`station_id`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `booking`
--
ALTER TABLE `booking`
  MODIFY `booking_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `bus`
--
ALTER TABLE `bus`
  MODIFY `bus_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT untuk tabel `city`
--
ALTER TABLE `city`
  MODIFY `city_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT untuk tabel `schedule`
--
ALTER TABLE `schedule`
  MODIFY `schedule_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT untuk tabel `seat`
--
ALTER TABLE `seat`
  MODIFY `seat_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `station`
--
ALTER TABLE `station`
  MODIFY `station_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
