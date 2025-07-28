<?php
/**
 * Reviews API
 * Xử lý reviews và replies
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

require_once '../config/database.php';

class ReviewsAPI {
    private $conn;
    
    public function __construct() {
        $database = new Database();
        $this->conn = $database->getConnection();
    }
    
    /**
     * Lấy reviews của một sách
     */
    public function getBookReviews($book_id) {
        try {
            $sql = "CALL GetBookReviews(?)";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute([$book_id]);
            
            $reviews = $stmt->fetchAll();
            
            // Lấy replies cho mỗi review
            foreach ($reviews as &$review) {
                $replies_sql = "CALL GetReviewReplies(?)";
                $replies_stmt = $this->conn->prepare($replies_sql);
                $replies_stmt->execute([$review['id']]);
                $review['replies'] = $replies_stmt->fetchAll();
            }
            
            return [
                'success' => true,
                'data' => $reviews
            ];
            
        } catch(PDOException $e) {
            return [
                'success' => false,
                'error' => $e->getMessage()
            ];
        }
    }
    
    /**
     * Thêm review mới
     */
    public function addReview($book_id, $user_id, $rating, $comment) {
        try {
            // Kiểm tra user đã review sách này chưa
            $check_sql = "SELECT id FROM reviews WHERE book_id = ? AND user_id = ?";
            $check_stmt = $this->conn->prepare($check_sql);
            $check_stmt->execute([$book_id, $user_id]);
            
            if ($check_stmt->fetch()) {
                return [
                    'success' => false,
                    'error' => 'Bạn đã đánh giá sách này rồi'
                ];
            }
            
            // Thêm review
            $sql = "INSERT INTO reviews (book_id, user_id, rating, comment) VALUES (?, ?, ?, ?)";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute([$book_id, $user_id, $rating, $comment]);
            
            return [
                'success' => true,
                'message' => 'Đánh giá đã được thêm thành công'
            ];
            
        } catch(PDOException $e) {
            return [
                'success' => false,
                'error' => $e->getMessage()
            ];
        }
    }
    
    /**
     * Xóa review
     */
    public function deleteReview($review_id, $user_id) {
        try {
            // Kiểm tra quyền xóa
            $check_sql = "SELECT id FROM reviews WHERE id = ? AND user_id = ?";
            $check_stmt = $this->conn->prepare($check_sql);
            $check_stmt->execute([$review_id, $user_id]);
            
            if (!$check_stmt->fetch()) {
                return [
                    'success' => false,
                    'error' => 'Bạn không có quyền xóa đánh giá này'
                ];
            }
            
            // Xóa review
            $sql = "DELETE FROM reviews WHERE id = ?";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute([$review_id]);
            
            return [
                'success' => true,
                'message' => 'Đánh giá đã được xóa'
            ];
            
        } catch(PDOException $e) {
            return [
                'success' => false,
                'error' => $e->getMessage()
            ];
        }
    }
    
    /**
     * Thêm reply
     */
    public function addReply($review_id, $user_id, $content, $parent_reply_id = null) {
        try {
            $sql = "INSERT INTO replies (review_id, user_id, content, parent_reply_id) VALUES (?, ?, ?, ?)";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute([$review_id, $user_id, $content, $parent_reply_id]);
            
            return [
                'success' => true,
                'message' => 'Trả lời đã được thêm thành công'
            ];
            
        } catch(PDOException $e) {
            return [
                'success' => false,
                'error' => $e->getMessage()
            ];
        }
    }
    
    /**
     * Xóa reply
     */
    public function deleteReply($reply_id, $user_id) {
        try {
            // Kiểm tra quyền xóa
            $check_sql = "SELECT id FROM replies WHERE id = ? AND user_id = ?";
            $check_stmt = $this->conn->prepare($check_sql);
            $check_stmt->execute([$reply_id, $user_id]);
            
            if (!$check_stmt->fetch()) {
                return [
                    'success' => false,
                    'error' => 'Bạn không có quyền xóa trả lời này'
                ];
            }
            
            // Xóa reply
            $sql = "DELETE FROM replies WHERE id = ?";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute([$reply_id]);
            
            return [
                'success' => true,
                'message' => 'Trả lời đã được xóa'
            ];
            
        } catch(PDOException $e) {
            return [
                'success' => false,
                'error' => $e->getMessage()
            ];
        }
    }
    
    /**
     * Like/Dislike review hoặc reply
     */
    public function toggleAction($user_id, $action_type, $target_id, $target_type) {
        try {
            // Kiểm tra action đã tồn tại chưa
            $check_sql = "SELECT id FROM user_actions WHERE user_id = ? AND action_type = ? AND target_id = ? AND target_type = ?";
            $check_stmt = $this->conn->prepare($check_sql);
            $check_stmt->execute([$user_id, $action_type, $target_id, $target_type]);
            
            $existing_action = $check_stmt->fetch();
            
            if ($existing_action) {
                // Xóa action nếu đã tồn tại (toggle)
                $delete_sql = "DELETE FROM user_actions WHERE id = ?";
                $delete_stmt = $this->conn->prepare($delete_sql);
                $delete_stmt->execute([$existing_action['id']]);
                
                return [
                    'success' => true,
                    'message' => 'Đã bỏ ' . ($action_type == 'like_review' || $action_type == 'like_reply' ? 'thích' : 'không thích')
                ];
            } else {
                // Thêm action mới
                $insert_sql = "INSERT INTO user_actions (user_id, action_type, target_id, target_type) VALUES (?, ?, ?, ?)";
                $insert_stmt = $this->conn->prepare($insert_sql);
                $insert_stmt->execute([$user_id, $action_type, $target_id, $target_type]);
                
                return [
                    'success' => true,
                    'message' => 'Đã ' . ($action_type == 'like_review' || $action_type == 'like_reply' ? 'thích' : 'không thích')
                ];
            }
            
        } catch(PDOException $e) {
            return [
                'success' => false,
                'error' => $e->getMessage()
            ];
        }
    }
}

// Handle API requests
$api = new ReviewsAPI();

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

switch ($method) {
    case 'GET':
        switch ($action) {
            case 'book_reviews':
                $book_id = $_GET['book_id'] ?? null;
                if ($book_id) {
                    echo json_encode($api->getBookReviews($book_id));
                } else {
                    echo json_encode(['success' => false, 'error' => 'Book ID required']);
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
            case 'add_review':
                $book_id = $input['book_id'] ?? null;
                $user_id = $input['user_id'] ?? null;
                $rating = $input['rating'] ?? null;
                $comment = $input['comment'] ?? '';
                
                if ($book_id && $user_id && $rating) {
                    echo json_encode($api->addReview($book_id, $user_id, $rating, $comment));
                } else {
                    echo json_encode(['success' => false, 'error' => 'Missing required fields']);
                }
                break;
                
            case 'delete_review':
                $review_id = $input['review_id'] ?? null;
                $user_id = $input['user_id'] ?? null;
                
                if ($review_id && $user_id) {
                    echo json_encode($api->deleteReview($review_id, $user_id));
                } else {
                    echo json_encode(['success' => false, 'error' => 'Missing required fields']);
                }
                break;
                
            case 'add_reply':
                $review_id = $input['review_id'] ?? null;
                $user_id = $input['user_id'] ?? null;
                $content = $input['content'] ?? '';
                $parent_reply_id = $input['parent_reply_id'] ?? null;
                
                if ($review_id && $user_id && $content) {
                    echo json_encode($api->addReply($review_id, $user_id, $content, $parent_reply_id));
                } else {
                    echo json_encode(['success' => false, 'error' => 'Missing required fields']);
                }
                break;
                
            case 'delete_reply':
                $reply_id = $input['reply_id'] ?? null;
                $user_id = $input['user_id'] ?? null;
                
                if ($reply_id && $user_id) {
                    echo json_encode($api->deleteReply($reply_id, $user_id));
                } else {
                    echo json_encode(['success' => false, 'error' => 'Missing required fields']);
                }
                break;
                
            case 'toggle_action':
                $user_id = $input['user_id'] ?? null;
                $action_type = $input['action_type'] ?? null;
                $target_id = $input['target_id'] ?? null;
                $target_type = $input['target_type'] ?? null;
                
                if ($user_id && $action_type && $target_id && $target_type) {
                    echo json_encode($api->toggleAction($user_id, $action_type, $target_id, $target_type));
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