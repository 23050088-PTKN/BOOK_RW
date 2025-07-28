<?php
/**
 * Users API
 * Xử lý authentication và saved books
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

require_once '../config/database.php';

class UsersAPI {
    private $conn;
    
    public function __construct() {
        $database = new Database();
        $this->conn = $database->getConnection();
    }
    
    /**
     * Đăng ký user mới
     */
    public function register($email, $password, $name) {
        try {
            // Kiểm tra email đã tồn tại chưa
            $check_sql = "SELECT id FROM users WHERE email = ?";
            $check_stmt = $this->conn->prepare($check_sql);
            $check_stmt->execute([$email]);
            
            if ($check_stmt->fetch()) {
                return [
                    'success' => false,
                    'error' => 'Email đã được sử dụng'
                ];
            }
            
            // Hash password
            $password_hash = password_hash($password, PASSWORD_DEFAULT);
            
            // Thêm user mới
            $sql = "INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute([$email, $password_hash, $name]);
            
            $user_id = $this->conn->lastInsertId();
            
            return [
                'success' => true,
                'message' => 'Đăng ký thành công',
                'user_id' => $user_id
            ];
            
        } catch(PDOException $e) {
            return [
                'success' => false,
                'error' => $e->getMessage()
            ];
        }
    }
    
    /**
     * Đăng nhập
     */
    public function login($email, $password) {
        try {
            $sql = "SELECT id, email, name, password_hash, role, avatar_url FROM users WHERE email = ? AND is_active = TRUE";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute([$email]);
            
            $user = $stmt->fetch();
            
            if ($user && password_verify($password, $user['password_hash'])) {
                // Không trả về password_hash
                unset($user['password_hash']);
                
                return [
                    'success' => true,
                    'message' => 'Đăng nhập thành công',
                    'user' => $user
                ];
            } else {
                return [
                    'success' => false,
                    'error' => 'Email hoặc mật khẩu không đúng'
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
     * Lấy thông tin user
     */
    public function getUser($user_id) {
        try {
            $sql = "SELECT id, email, name, role, avatar_url, created_at FROM users WHERE id = ? AND is_active = TRUE";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute([$user_id]);
            
            $user = $stmt->fetch();
            
            if ($user) {
                return [
                    'success' => true,
                    'data' => $user
                ];
            } else {
                return [
                    'success' => false,
                    'error' => 'User not found'
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
     * Lấy sách đã lưu của user
     */
    public function getSavedBooks($user_id) {
        try {
            $sql = "SELECT b.*, sb.created_at as saved_at
                    FROM saved_books sb
                    JOIN books b ON sb.book_id = b.id
                    WHERE sb.user_id = ? AND b.status = 'active'
                    ORDER BY sb.created_at DESC";
            
            $stmt = $this->conn->prepare($sql);
            $stmt->execute([$user_id]);
            
            $books = $stmt->fetchAll();
            
            return [
                'success' => true,
                'data' => $books
            ];
            
        } catch(PDOException $e) {
            return [
                'success' => false,
                'error' => $e->getMessage()
            ];
        }
    }
    
    /**
     * Lưu sách
     */
    public function saveBook($user_id, $book_id) {
        try {
            // Kiểm tra sách đã được lưu chưa
            $check_sql = "SELECT id FROM saved_books WHERE user_id = ? AND book_id = ?";
            $check_stmt = $this->conn->prepare($check_sql);
            $check_stmt->execute([$user_id, $book_id]);
            
            if ($check_stmt->fetch()) {
                return [
                    'success' => false,
                    'error' => 'Sách đã được lưu rồi'
                ];
            }
            
            // Lưu sách
            $sql = "INSERT INTO saved_books (user_id, book_id) VALUES (?, ?)";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute([$user_id, $book_id]);
            
            return [
                'success' => true,
                'message' => 'Đã lưu sách thành công'
            ];
            
        } catch(PDOException $e) {
            return [
                'success' => false,
                'error' => $e->getMessage()
            ];
        }
    }
    
    /**
     * Bỏ lưu sách
     */
    public function unsaveBook($user_id, $book_id) {
        try {
            $sql = "DELETE FROM saved_books WHERE user_id = ? AND book_id = ?";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute([$user_id, $book_id]);
            
            if ($stmt->rowCount() > 0) {
                return [
                    'success' => true,
                    'message' => 'Đã bỏ lưu sách'
                ];
            } else {
                return [
                    'success' => false,
                    'error' => 'Sách chưa được lưu'
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
     * Kiểm tra sách đã được lưu chưa
     */
    public function isBookSaved($user_id, $book_id) {
        try {
            $sql = "SELECT id FROM saved_books WHERE user_id = ? AND book_id = ?";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute([$user_id, $book_id]);
            
            return [
                'success' => true,
                'is_saved' => $stmt->fetch() ? true : false
            ];
            
        } catch(PDOException $e) {
            return [
                'success' => false,
                'error' => $e->getMessage()
            ];
        }
    }
    
    /**
     * Lấy số lượng sách đã lưu
     */
    public function getSavedBooksCount($user_id) {
        try {
            $sql = "SELECT COUNT(*) as count FROM saved_books WHERE user_id = ?";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute([$user_id]);
            
            $result = $stmt->fetch();
            
            return [
                'success' => true,
                'count' => $result['count']
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
$api = new UsersAPI();

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

switch ($method) {
    case 'GET':
        switch ($action) {
            case 'user_info':
                $user_id = $_GET['user_id'] ?? null;
                if ($user_id) {
                    echo json_encode($api->getUser($user_id));
                } else {
                    echo json_encode(['success' => false, 'error' => 'User ID required']);
                }
                break;
                
            case 'saved_books':
                $user_id = $_GET['user_id'] ?? null;
                if ($user_id) {
                    echo json_encode($api->getSavedBooks($user_id));
                } else {
                    echo json_encode(['success' => false, 'error' => 'User ID required']);
                }
                break;
                
            case 'is_saved':
                $user_id = $_GET['user_id'] ?? null;
                $book_id = $_GET['book_id'] ?? null;
                if ($user_id && $book_id) {
                    echo json_encode($api->isBookSaved($user_id, $book_id));
                } else {
                    echo json_encode(['success' => false, 'error' => 'User ID and Book ID required']);
                }
                break;
                
            case 'saved_count':
                $user_id = $_GET['user_id'] ?? null;
                if ($user_id) {
                    echo json_encode($api->getSavedBooksCount($user_id));
                } else {
                    echo json_encode(['success' => false, 'error' => 'User ID required']);
                }
                break;
                
            default:
                echo json_encode(['success' => false, 'error' => 'Invalid action']);
                break;
        }
        break;
        
    case 'POST':
        $input = json_decode(file_get_contents('php://input'), true);
        
        switch ($action) {
            case 'register':
                $email = $input['email'] ?? '';
                $password = $input['password'] ?? '';
                $name = $input['name'] ?? '';
                
                if ($email && $password && $name) {
                    echo json_encode($api->register($email, $password, $name));
                } else {
                    echo json_encode(['success' => false, 'error' => 'Missing required fields']);
                }
                break;
                
            case 'login':
                $email = $input['email'] ?? '';
                $password = $input['password'] ?? '';
                
                if ($email && $password) {
                    echo json_encode($api->login($email, $password));
                } else {
                    echo json_encode(['success' => false, 'error' => 'Missing required fields']);
                }
                break;
                
            case 'save_book':
                $user_id = $input['user_id'] ?? null;
                $book_id = $input['book_id'] ?? null;
                
                if ($user_id && $book_id) {
                    echo json_encode($api->saveBook($user_id, $book_id));
                } else {
                    echo json_encode(['success' => false, 'error' => 'Missing required fields']);
                }
                break;
                
            case 'unsave_book':
                $user_id = $input['user_id'] ?? null;
                $book_id = $input['book_id'] ?? null;
                
                if ($user_id && $book_id) {
                    echo json_encode($api->unsaveBook($user_id, $book_id));
                } else {
                    echo json_encode(['success' => false, 'error' => 'Missing required fields']);
                }
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