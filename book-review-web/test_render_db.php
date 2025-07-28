<?php
// Test database connection cho Render
// File này chỉ để test, xóa sau khi deploy

// Thông tin database từ Render (thay thế bằng thông tin thực của bạn)
$host = 'your-db-host.render.com';
$dbname = 'book_review_system1';
$username = 'bookreview_user';
$password = 'your-password';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    echo "<h2>✅ Database connection successful!</h2>";
    echo "<p>Host: $host</p>";
    echo "<p>Database: $dbname</p>";
    echo "<p>Username: $username</p>";
    
    // Test query
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM information_schema.tables");
    $result = $stmt->fetch();
    echo "<p>Tables found: " . $result['count'] . "</p>";
    
} catch(PDOException $e) {
    echo "<h2>❌ Database connection failed!</h2>";
    echo "<p>Error: " . $e->getMessage() . "</p>";
    echo "<p>Please check your database credentials.</p>";
}
?> 