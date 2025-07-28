<?php
/**
 * Books API
 * Lấy danh sách sách từ database
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

require_once '../config/database.php';

class BooksAPI {
    private $conn;
    
    public function __construct() {
        $database = new Database();
        $this->conn = $database->getConnection();
    }
    
    /**
     * Lấy danh sách sách với phân trang
     */
    public function getBooks($page = 1, $limit = 8, $genre_id = null) {
        try {
            $offset = ($page - 1) * $limit;
            
            $sql = "CALL GetBooksWithReviews(?, ?, ?)";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute([$genre_id, $page, $limit]);
            
            $books = $stmt->fetchAll();
            
            // Lấy tổng số sách
            $count_sql = "SELECT COUNT(*) as total FROM books WHERE status = 'active'";
            if ($genre_id) {
                $count_sql = "SELECT COUNT(DISTINCT b.id) as total 
                             FROM books b 
                             JOIN book_genres bg ON b.id = bg.book_id 
                             WHERE b.status = 'active' AND bg.genre_id = ?";
                $count_stmt = $this->conn->prepare($count_sql);
                $count_stmt->execute([$genre_id]);
            } else {
                $count_stmt = $this->conn->prepare($count_sql);
                $count_stmt->execute();
            }
            
            $total = $count_stmt->fetch()['total'];
            
            return [
                'success' => true,
                'data' => $books,
                'pagination' => [
                    'current_page' => $page,
                    'total_pages' => ceil($total / $limit),
                    'total_items' => $total,
                    'items_per_page' => $limit
                ]
            ];
            
        } catch(PDOException $e) {
            return [
                'success' => false,
                'error' => $e->getMessage()
            ];
        }
    }
    
    /**
     * Lấy chi tiết một sách
     */
    public function getBook($id) {
        try {
            $sql = "SELECT b.*, 
                           GROUP_CONCAT(DISTINCT g.name) as genres,
                           COUNT(r.id) as review_count,
                           AVG(r.rating) as average_rating
                    FROM books b
                    LEFT JOIN book_genres bg ON b.id = bg.book_id
                    LEFT JOIN genres g ON bg.genre_id = g.id
                    LEFT JOIN reviews r ON b.id = r.book_id AND r.is_approved = TRUE
                    WHERE b.id = ? AND b.status = 'active'
                    GROUP BY b.id";
            
            $stmt = $this->conn->prepare($sql);
            $stmt->execute([$id]);
            
            $book = $stmt->fetch();
            
            if ($book) {
                return [
                    'success' => true,
                    'data' => $book
                ];
            } else {
                return [
                    'success' => false,
                    'error' => 'Book not found'
                ];
            }
            
        } catch(PDOException $e) {
            return [
                'success' => false,
                'error' => $e->getMessage()
            ];
        }
    }
    
    /**
     * Tìm kiếm sách
     */
    public function searchBooks($query, $page = 1, $limit = 8) {
        try {
            $offset = ($page - 1) * $limit;
            
            $sql = "SELECT b.*, 
                           GROUP_CONCAT(DISTINCT g.name) as genres,
                           COUNT(r.id) as review_count,
                           AVG(r.rating) as average_rating
                    FROM books b
                    LEFT JOIN book_genres bg ON b.id = bg.book_id
                    LEFT JOIN genres g ON bg.genre_id = g.id
                    LEFT JOIN reviews r ON b.id = r.book_id AND r.is_approved = TRUE
                    WHERE b.status = 'active' 
                    AND (b.title LIKE ? OR b.author LIKE ? OR b.description LIKE ?)
                    GROUP BY b.id
                    ORDER BY b.created_at DESC
                    LIMIT ? OFFSET ?";
            
            $search_term = "%$query%";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute([$search_term, $search_term, $search_term, $limit, $offset]);
            
            $books = $stmt->fetchAll();
            
            return [
                'success' => true,
                'data' => $books,
                'query' => $query
            ];
            
        } catch(PDOException $e) {
            return [
                'success' => false,
                'error' => $e->getMessage()
            ];
        }
    }
    
    /**
     * Lấy danh sách genres
     */
    public function getGenres() {
        try {
            $sql = "SELECT * FROM genres ORDER BY name";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            
            $genres = $stmt->fetchAll();
            
            return [
                'success' => true,
                'data' => $genres
            ];
            
        } catch(PDOException $e) {
            return [
                'success' => false,
                'error' => $e->getMessage()
            ];
        }
    }
}

// Handle API requests
$api = new BooksAPI();

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

switch ($method) {
    case 'GET':
        switch ($action) {
            case 'list':
                $page = $_GET['page'] ?? 1;
                $limit = $_GET['limit'] ?? 8;
                $genre_id = $_GET['genre_id'] ?? null;
                echo json_encode($api->getBooks($page, $limit, $genre_id));
                break;
                
            case 'detail':
                $id = $_GET['id'] ?? null;
                if ($id) {
                    echo json_encode($api->getBook($id));
                } else {
                    echo json_encode(['success' => false, 'error' => 'Book ID required']);
                }
                break;
                
            case 'search':
                $query = $_GET['q'] ?? '';
                $page = $_GET['page'] ?? 1;
                $limit = $_GET['limit'] ?? 8;
                if ($query) {
                    echo json_encode($api->searchBooks($query, $page, $limit));
                } else {
                    echo json_encode(['success' => false, 'error' => 'Search query required']);
                }
                break;
                
            case 'genres':
                echo json_encode($api->getGenres());
                break;
                
            default:
                echo json_encode(['success' => false, 'error' => 'Invalid action']);
                break;
        }
        break;
        
    default:
        echo json_encode(['success' => false, 'error' => 'Method not allowed']);
        break;
}
?> 