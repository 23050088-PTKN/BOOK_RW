-- Simple Database Setup for Book Review System
-- Sử dụng cho Render Console

-- Tạo bảng users
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tạo bảng genres
CREATE TABLE IF NOT EXISTS genres (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT
);

-- Tạo bảng books
CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    description TEXT,
    cover_image VARCHAR(255),
    publication_year INT,
    isbn VARCHAR(20),
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    rating DECIMAL(3,2) DEFAULT 0.00,
    total_reviews INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tạo bảng book_genres
CREATE TABLE IF NOT EXISTS book_genres (
    book_id INT,
    genre_id INT,
    PRIMARY KEY (book_id, genre_id),
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
    FOREIGN KEY (genre_id) REFERENCES genres(id) ON DELETE CASCADE
);

-- Tạo bảng reviews
CREATE TABLE IF NOT EXISTS reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    book_id INT NOT NULL,
    user_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    likes_count INT DEFAULT 0,
    dislikes_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tạo bảng replies
CREATE TABLE IF NOT EXISTS replies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    review_id INT NOT NULL,
    user_id INT NOT NULL,
    comment TEXT NOT NULL,
    likes_count INT DEFAULT 0,
    dislikes_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (review_id) REFERENCES reviews(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tạo bảng saved_books
CREATE TABLE IF NOT EXISTS saved_books (
    user_id INT,
    book_id INT,
    saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, book_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
);

-- Thêm dữ liệu mẫu cho genres
INSERT INTO genres (name, description) VALUES
('Việt Nam', 'Sách văn học Việt Nam'),
('Quốc tế', 'Sách văn học quốc tế'),
('Tiểu thuyết', 'Tiểu thuyết các loại'),
('Self-help', 'Sách phát triển bản thân'),
('Khoa học', 'Sách khoa học'),
('Lịch sử', 'Sách lịch sử'),
('Viễn tưởng', 'Sách khoa học viễn tưởng');

-- Thêm dữ liệu mẫu cho books
INSERT INTO books (title, author, description, cover_image, publication_year, status, rating) VALUES
('Dune', 'Frank Herbert', 'Câu chuyện khoa học viễn tưởng về một hành tinh sa mạc.', 'a1/1.jpg', 1965, 'approved', 4.5),
('The Lord of the Rings', 'J.R.R. Tolkien', 'Bộ tiểu thuyết giả tưởng nổi tiếng.', 'a1/2.jpg', 1954, 'approved', 4.8),
('1984', 'George Orwell', 'Tiểu thuyết dystopian về xã hội giám sát.', 'a1/3.jpg', 1949, 'approved', 4.3);

-- Liên kết books với genres
INSERT INTO book_genres (book_id, genre_id) VALUES
(1, 7), -- Dune - Viễn tưởng
(2, 7), -- LOTR - Viễn tưởng
(3, 3); -- 1984 - Tiểu thuyết 