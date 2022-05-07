use ucode_web;
DROP TABLE IF EXISTS users_info;
CREATE TABLE IF NOT EXISTS users_info(
    login VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    fullName VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    userStatus ENUM('admin', 'user') DEFAULT 'user',
    maxScore BIGINT DEFAULT 0
)

