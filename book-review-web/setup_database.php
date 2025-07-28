<?php
/**
 * Tự động setup database khi deploy
 * Chạy file này một lần sau khi deploy
 */

// Thông tin database từ environment variables
$host = getenv('DB_HOST') ?: 'localhost';
$dbname = getenv('DB_NAME') ?: 'book_review_system1';
$username = getenv('DB_USER') ?: 'root';
$password = getenv('DB_PASS') ?: '23050103';

try {
    // Kết nối không chỉ định database
    $pdo = new PDO("mysql:host=$host", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    echo "<h2>🔧 Setting up database...</h2>";
    
    // Tạo database nếu chưa có
    $pdo->exec("CREATE DATABASE IF NOT EXISTS `$dbname` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
    echo "✅ Database '$dbname' created/verified<br>";
    
    // Chọn database
    $pdo->exec("USE `$dbname`");
    echo "✅ Using database '$dbname'<br>";
    
    // Tạo các bảng
    $tables = [
        "CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            role ENUM('user', 'admin') DEFAULT 'user',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )",
        
        "CREATE TABLE IF NOT EXISTS genres (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(50) NOT NULL UNIQUE,
            description TEXT
        )",
        
        "CREATE TABLE IF NOT EXISTS books (
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
        )",
        
        "CREATE TABLE IF NOT EXISTS book_genres (
            book_id INT,
            genre_id INT,
            PRIMARY KEY (book_id, genre_id),
            FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
            FOREIGN KEY (genre_id) REFERENCES genres(id) ON DELETE CASCADE
        )",
        
        "CREATE TABLE IF NOT EXISTS reviews (
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
        )",
        
        "CREATE TABLE IF NOT EXISTS replies (
            id INT AUTO_INCREMENT PRIMARY KEY,
            review_id INT NOT NULL,
            user_id INT NOT NULL,
            comment TEXT NOT NULL,
            likes_count INT DEFAULT 0,
            dislikes_count INT DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (review_id) REFERENCES reviews(id) ON DELETE CASCADE,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )",
        
        "CREATE TABLE IF NOT EXISTS saved_books (
            user_id INT,
            book_id INT,
            saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (user_id, book_id),
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
        )"
    ];
    
    foreach ($tables as $sql) {
        $pdo->exec($sql);
    }
    echo "✅ All tables created successfully<br>";
    
    // Thêm dữ liệu mẫu cho genres
    $genres = [
        ['Việt Nam', 'Sách văn học Việt Nam'],
        ['Quốc tế', 'Sách văn học quốc tế'],
        ['Tiểu thuyết', 'Tiểu thuyết các loại'],
        ['Self-help', 'Sách phát triển bản thân'],
        ['Khoa học', 'Sách khoa học'],
        ['Lịch sử', 'Sách lịch sử'],
        ['Viễn tưởng', 'Sách khoa học viễn tưởng']
    ];
    
    $stmt = $pdo->prepare("INSERT IGNORE INTO genres (name, description) VALUES (?, ?)");
    foreach ($genres as $genre) {
        $stmt->execute($genre);
    }
    echo "✅ Sample genres added<br>";
    
    // Thêm dữ liệu mẫu cho books
    $books = [
        ['Dune', 'Frank Herbert', 'Câu chuyện khoa học viễn tưởng về một hành tinh sa mạc.', 'a1/1.jpg', 1965, 'approved', 4.5],
        ['The Lord of the Rings', 'J.R.R. Tolkien', 'Bộ tiểu thuyết giả tưởng nổi tiếng.', 'a1/2.jpg', 1954, 'approved', 4.8],
        ['1984', 'George Orwell', 'Tiểu thuyết dystopian về xã hội giám sát.', 'a1/3.jpg', 1949, 'approved', 4.3]
    ];
    
    $stmt = $pdo->prepare("INSERT IGNORE INTO books (title, author, description, cover_image, publication_year, status, rating) VALUES (?, ?, ?, ?, ?, ?, ?)");
    foreach ($books as $book) {
        $stmt->execute($book);
    }
    echo "✅ Sample books added<br>";
    
    echo "<h2>🎉 Database setup completed successfully!</h2>";
    echo "<p>Your book review system is ready to use.</p>";
    
} catch(PDOException $e) {
    echo "<h2>❌ Database setup failed!</h2>";
    echo "<p>Error: " . $e->getMessage() . "</p>";
    echo "<p>Please check your database credentials.</p>";
}
?> 