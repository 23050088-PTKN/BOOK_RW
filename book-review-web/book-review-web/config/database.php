<?php
/**
 * Database Configuration và Connection
 * Hệ thống đánh giá sách - Book Review System
 */

class Database {
    private $host = 'localhost';
    private $db_name = 'book_review_system1';
    private $username = 'root';
    private $password = '23050103'; // Thay đổi password của bạn ở đây
    private $conn;
    
    /**
     * Kết nối database
     */
    public function getConnection() {
        $this->conn = null;
        
        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name . ";charset=utf8mb4",
                $this->username,
                $this->password,
                array(
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false
                )
            );
        } catch(PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }
        
        return $this->conn;
    }
    
    /**
     * Test kết nối
     */
    public function testConnection() {
        try {
            $conn = $this->getConnection();
            if($conn) {
                echo "Database connected successfully!";
                return true;
            }
        } catch(Exception $e) {
            echo "Connection failed: " . $e->getMessage();
            return false;
        }
    }
}

// Sử dụng:
// $database = new Database();
// $db = $database->getConnection();
?> 