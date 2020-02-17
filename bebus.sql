-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 17, 2020 at 08:08 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.1

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
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `booking_id` int(11) NOT NULL,
  `booking_number` int(11) NOT NULL,
  `booking_seat_number` int(11) NOT NULL,
  `booking_user_id` int(11) NOT NULL,
  `booking_schedule_id` int(11) NOT NULL,
  `booking_status` enum('UNPAID','PENDING','PAID','FAILED','CHALLENGE') NOT NULL DEFAULT 'UNPAID'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`booking_id`, `booking_number`, `booking_seat_number`, `booking_user_id`, `booking_schedule_id`, `booking_status`) VALUES
(1, 1, 1, 1, 1, 'PAID'),
(2, 321, 2, 1, 1, 'PAID'),
(3, 3367264, 2, 1, 2, 'PENDING'),
(4, 1163631, 3, 1, 2, 'PAID'),
(5, 3996640, 4, 1, 2, 'PAID'),
(6, 1735029, 4, 1, 1, 'UNPAID'),
(7, 123, 1, 1, 1, 'UNPAID');

-- --------------------------------------------------------

--
-- Table structure for table `bus`
--

CREATE TABLE `bus` (
  `bus_id` int(11) NOT NULL,
  `bus_name` varchar(100) NOT NULL,
  `bus_capacity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bus`
--

INSERT INTO `bus` (`bus_id`, `bus_name`, `bus_capacity`) VALUES
(1, 'Harapan Jaya', 10);

-- --------------------------------------------------------

--
-- Table structure for table `city`
--

CREATE TABLE `city` (
  `city_id` int(11) NOT NULL,
  `city_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `city`
--

INSERT INTO `city` (`city_id`, `city_name`) VALUES
(1, 'Bogor'),
(2, 'Solo');

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `schedule_id` int(11) NOT NULL,
  `schedule_departure_station_id` int(11) NOT NULL,
  `schedule_arrival_station_id` int(11) NOT NULL,
  `schedule_price` int(11) NOT NULL,
  `schedule_departure_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `schedule_arrival_time` timestamp NULL DEFAULT current_timestamp(),
  `schedule_bus_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`schedule_id`, `schedule_departure_station_id`, `schedule_arrival_station_id`, `schedule_price`, `schedule_departure_time`, `schedule_arrival_time`, `schedule_bus_id`) VALUES
(1, 1, 2, 50000, '2020-02-15 05:43:16', '2020-02-16 16:43:16', 1),
(2, 1, 2, 222222, '2020-02-15 17:00:00', '2020-02-17 16:00:01', 1);

-- --------------------------------------------------------

--
-- Table structure for table `seat`
--

CREATE TABLE `seat` (
  `seat_id` int(11) NOT NULL,
  `seat_number` int(11) NOT NULL,
  `seat_booking_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `station`
--

CREATE TABLE `station` (
  `station_id` int(11) NOT NULL,
  `station_city_id` int(11) NOT NULL,
  `station_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `station`
--

INSERT INTO `station` (`station_id`, `station_city_id`, `station_name`) VALUES
(1, 1, 'bogor station'),
(2, 2, 'cimahi');

-- --------------------------------------------------------

--
-- Table structure for table `user`
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
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_name`, `user_email`, `user_phone`, `user_username`, `user_password`, `user_photo`, `reset_key`, `updated_at`) VALUES
(1, 'Admin', 'admin@admin', NULL, 'admin', '$2a$04$n7azIK7y1cR818Fe9WfwKe4aEi.MXisDxsntFc2zHJXUug18c/l.6', '1581763586831.PNG', NULL, '2020-02-17 07:07:47'),
(3, 'Admin', 'admin@admin10', NULL, 'admin10', '$2a$04$OM09Wx9WJCscBVjOK9X0dOXeqThpTvMTC5.trCwTytm2.rtPhROl.', NULL, NULL, '2020-02-17 07:07:47'),
(5, 'Admin', 'admin@admin11', NULL, 'admin11', '$2a$04$e88L5qZINoUHKqqglduGS.41e/qJD4yJWl4j6WsYfZRInOXy3xBmO', NULL, NULL, '2020-02-17 07:07:47'),
(6, 'Admin', 'admin@adminx', NULL, 'adminx', '$2a$04$yzg7h9pzgaPcLU.Aqj1YSOly73wzQwDc70LK9iKjL8ujDqv9cs6Om', NULL, NULL, '2020-02-17 07:07:47');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`booking_id`);

--
-- Indexes for table `bus`
--
ALTER TABLE `bus`
  ADD PRIMARY KEY (`bus_id`);

--
-- Indexes for table `city`
--
ALTER TABLE `city`
  ADD PRIMARY KEY (`city_id`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`schedule_id`);

--
-- Indexes for table `seat`
--
ALTER TABLE `seat`
  ADD PRIMARY KEY (`seat_id`);

--
-- Indexes for table `station`
--
ALTER TABLE `station`
  ADD PRIMARY KEY (`station_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_name` (`user_name`,`user_email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `booking_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `bus`
--
ALTER TABLE `bus`
  MODIFY `bus_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `city`
--
ALTER TABLE `city`
  MODIFY `city_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `schedule_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `seat`
--
ALTER TABLE `seat`
  MODIFY `seat_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `station`
--
ALTER TABLE `station`
  MODIFY `station_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
