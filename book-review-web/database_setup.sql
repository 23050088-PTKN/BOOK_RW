-- Database Setup for Book Review System
-- UTF-8 Encoded Version

-- Create database
CREATE DATABASE IF NOT EXISTS book_review_system1 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE book_review_system1;

-- Create tables
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE genres (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE books (
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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE book_genres (
    book_id INT,
    genre_id INT,
    PRIMARY KEY (book_id, genre_id),
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
    FOREIGN KEY (genre_id) REFERENCES genres(id) ON DELETE CASCADE
);

CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    book_id INT NOT NULL,
    user_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    likes_count INT DEFAULT 0,
    dislikes_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE replies (
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

CREATE TABLE saved_books (
    user_id INT,
    book_id INT,
    saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, book_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
);

CREATE TABLE user_actions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    review_id INT,
    reply_id INT,
    action_type ENUM('like', 'dislike') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (review_id) REFERENCES reviews(id) ON DELETE SET NULL,
    FOREIGN KEY (reply_id) REFERENCES replies(id) ON DELETE SET NULL
);

-- Create indexes for performance
CREATE INDEX idx_email ON users(email);
CREATE INDEX idx_title ON books(title);
CREATE INDEX idx_status ON books(status);
CREATE INDEX idx_book_rating ON books(rating);
CREATE INDEX idx_review_book ON reviews(book_id);
CREATE INDEX idx_review_user ON reviews(user_id);
CREATE INDEX idx_reply_review ON replies(review_id);
CREATE INDEX idx_saved_user ON saved_books(user_id);
CREATE INDEX idx_saved_book ON saved_books(book_id);

-- Full-text search index
CREATE FULLTEXT INDEX idx_search ON books(title, author, description);

-- Composite indexes
CREATE INDEX idx_book_status_rating ON books(status, rating);
CREATE INDEX idx_review_book_rating ON reviews(book_id, rating);

-- Create stored procedures
DELIMITER //

CREATE PROCEDURE GetBooksWithReviews(
    IN p_limit INT,
    IN p_offset INT,
    IN p_status VARCHAR(20)
)
BEGIN
    SELECT 
        b.*,
        COUNT(DISTINCT r.id) as review_count,
        AVG(r.rating) as avg_rating
    FROM books b
    LEFT JOIN reviews r ON b.id = r.book_id
    WHERE (p_status IS NULL OR b.status = p_status)
    GROUP BY b.id
    ORDER BY b.created_at DESC
    LIMIT p_limit OFFSET p_offset;
END //

CREATE PROCEDURE UpdateBookRating(IN p_book_id INT)
BEGIN
    UPDATE books 
    SET 
        rating = (
            SELECT AVG(rating) 
            FROM reviews 
            WHERE book_id = p_book_id
        ),
        total_reviews = (
            SELECT COUNT(*) 
            FROM reviews 
            WHERE book_id = p_book_id
        )
    WHERE id = p_book_id;
END //

CREATE PROCEDURE GetBookReviews(IN p_book_id INT)
BEGIN
    SELECT 
        r.*,
        u.name as user_name,
        u.email as user_email
    FROM reviews r
    JOIN users u ON r.user_id = u.id
    WHERE r.book_id = p_book_id
    ORDER BY r.created_at DESC;
END //

CREATE PROCEDURE GetReviewReplies(IN p_review_id INT)
BEGIN
    SELECT 
        r.*,
        u.name as user_name,
        u.email as user_email
    FROM replies r
    JOIN users u ON r.user_id = u.id
    WHERE r.review_id = p_review_id
    ORDER BY r.created_at ASC;
END //

DELIMITER ;

-- Create triggers
DELIMITER //

CREATE TRIGGER update_book_rating_after_review
AFTER INSERT ON reviews
FOR EACH ROW
BEGIN
    CALL UpdateBookRating(NEW.book_id);
END //

CREATE TRIGGER update_book_rating_after_review_update
AFTER UPDATE ON reviews
FOR EACH ROW
BEGIN
    CALL UpdateBookRating(NEW.book_id);
END //

CREATE TRIGGER update_review_likes_after_action
AFTER INSERT ON user_actions
FOR EACH ROW
BEGIN
    IF NEW.review_id IS NOT NULL THEN
        IF NEW.action_type = 'like' THEN
            UPDATE reviews SET likes_count = likes_count + 1 WHERE id = NEW.review_id;
        ELSE
            UPDATE reviews SET dislikes_count = dislikes_count + 1 WHERE id = NEW.review_id;
        END IF;
    END IF;
    
    IF NEW.reply_id IS NOT NULL THEN
        IF NEW.action_type = 'like' THEN
            UPDATE replies SET likes_count = likes_count + 1 WHERE id = NEW.reply_id;
        ELSE
            UPDATE replies SET dislikes_count = dislikes_count + 1 WHERE id = NEW.reply_id;
        END IF;
    END IF;
END //

DELIMITER ;

-- Insert sample data
INSERT INTO genres (name, description) VALUES
('Fiction', 'Imaginative literature'),
('Non-Fiction', 'Factual literature'),
('Science Fiction', 'Futuristic and scientific themes'),
('Mystery', 'Detective and crime stories'),
('Romance', 'Love and relationship stories'),
('Fantasy', 'Magical and supernatural elements'),
('Biography', 'Life stories of real people'),
('History', 'Historical events and periods'),
('Technology', 'Computer and technical books'),
('Self-Help', 'Personal development books');

-- Insert admin user (password: admin123)
INSERT INTO users (name, email, password, role) VALUES
('Admin', 'admin@bookreview.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');

-- Insert sample books
INSERT INTO books (title, author, description, publication_year, status, rating) VALUES
('The Great Gatsby', 'F. Scott Fitzgerald', 'A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.', 1925, 'approved', 4.5),
('To Kill a Mockingbird', 'Harper Lee', 'The story of young Scout Finch and her father Atticus in a racially divided Alabama town.', 1960, 'approved', 4.8),
('1984', 'George Orwell', 'A dystopian novel about totalitarian surveillance and control.', 1949, 'approved', 4.3),
('Pride and Prejudice', 'Jane Austen', 'The story of Elizabeth Bennet and Mr. Darcy in Georgian-era England.', 1813, 'approved', 4.6),
('The Hobbit', 'J.R.R. Tolkien', 'A fantasy novel about Bilbo Baggins and his journey with thirteen dwarves.', 1937, 'approved', 4.7),
('Dragon Ball', 'Akira Toriyama', 'A Japanese manga series about Goku and his quest for the Dragon Balls.', 1984, 'approved', 4.4),
('Harry Potter and the Philosopher''s Stone', 'J.K. Rowling', 'The first book in the Harry Potter series about a young wizard.', 1997, 'approved', 4.9),
('The Lord of the Rings', 'J.R.R. Tolkien', 'An epic fantasy trilogy about the quest to destroy a powerful ring.', 1954, 'approved', 4.8),
('The Catcher in the Rye', 'J.D. Salinger', 'A novel about teenage alienation and loss of innocence.', 1951, 'approved', 4.2),
('Animal Farm', 'George Orwell', 'An allegorical novella about farm animals who rebel against their human farmer.', 1945, 'approved', 4.4);

-- Link books to genres
INSERT INTO book_genres (book_id, genre_id) VALUES
(1, 1), (1, 5), -- The Great Gatsby: Fiction, Romance
(2, 1), (2, 8), -- To Kill a Mockingbird: Fiction, History
(3, 1), (3, 3), -- 1984: Fiction, Science Fiction
(4, 1), (4, 5), -- Pride and Prejudice: Fiction, Romance
(5, 1), (5, 6), -- The Hobbit: Fiction, Fantasy
(6, 1), (6, 6), -- Dragon Ball: Fiction, Fantasy
(7, 1), (7, 6), -- Harry Potter: Fiction, Fantasy
(8, 1), (8, 6), -- Lord of the Rings: Fiction, Fantasy
(9, 1), (9, 2), -- Catcher in the Rye: Fiction, Non-Fiction
(10, 1), (10, 2); -- Animal Farm: Fiction, Non-Fiction

-- Insert sample reviews
INSERT INTO reviews (book_id, user_id, rating, comment) VALUES
(1, 1, 5, 'A masterpiece of American literature. The prose is beautiful and the story is timeless.'),
(2, 1, 4, 'Powerful story about justice and racism. Still relevant today.'),
(3, 1, 5, 'Disturbing but important read about totalitarianism.'),
(4, 1, 4, 'Classic romance with witty dialogue and memorable characters.'),
(5, 1, 5, 'Wonderful fantasy adventure that started it all for Tolkien.');

-- Insert sample replies
INSERT INTO replies (review_id, user_id, comment) VALUES
(1, 1, 'I completely agree! The symbolism is incredible.'),
(2, 1, 'This book should be required reading in schools.'),
(3, 1, 'The ending is so powerful and haunting.');

-- Insert sample saved books
INSERT INTO saved_books (user_id, book_id) VALUES
(1, 1),
(1, 3),
(1, 5);

-- Create views
CREATE VIEW user_reviews AS
SELECT 
    u.name as user_name,
    u.email as user_email,
    b.title as book_title,
    r.rating,
    r.comment,
    r.created_at
FROM reviews r
JOIN users u ON r.user_id = u.id
JOIN books b ON r.book_id = b.id
ORDER BY r.created_at DESC;

CREATE VIEW book_stats AS
SELECT 
    b.id,
    b.title,
    b.author,
    b.rating,
    b.total_reviews,
    COUNT(DISTINCT sb.user_id) as saved_count,
    COUNT(DISTINCT g.name) as genre_count
FROM books b
LEFT JOIN saved_books sb ON b.id = sb.book_id
LEFT JOIN book_genres bg ON b.id = bg.book_id
LEFT JOIN genres g ON bg.genre_id = g.id
GROUP BY b.id, b.title, b.author, b.rating, b.total_reviews;

-- Grant privileges (uncomment if needed)
-- CREATE USER 'bookreview_user'@'localhost' IDENTIFIED BY 'password123';
-- GRANT SELECT, INSERT, UPDATE, DELETE ON book_review_system.* TO 'bookreview_user'@'localhost';
-- FLUSH PRIVILEGES;