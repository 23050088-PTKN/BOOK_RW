# Book Review Web Application

Ứng dụng web đánh giá sách với PHP và MySQL.

## Tính năng
- Đánh giá và review sách
- Tìm kiếm sách theo thể loại
- Hệ thống đăng nhập/đăng ký
- Quản lý profile người dùng
- Responsive design

## Cài đặt Local
1. Clone repository
2. Cài đặt XAMPP/WAMP
3. Import database từ `database_setup.sql`
4. Cấu hình database trong `config/database.php`
5. Chạy trên localhost

## Deploy lên Render
Xem file `DEPLOYMENT.md` để biết hướng dẫn chi tiết về:
- Cấu hình Render
- Tạo database
- Cấu hình custom domain
- Environment variables

## Cấu trúc dự án
```
book-review-web/
├── api/           # API endpoints
├── config/        # Database configuration
├── a1-a5/         # Book images
├── *.html         # Frontend pages
├── styles.css     # CSS styles
├── script.js      # JavaScript
└── render.yaml    # Render configuration
```

## Custom Domain
Để có domain riêng trên Render:
1. Deploy ứng dụng lên Render
2. Trong web service settings → Custom Domains
3. Thêm domain của bạn
4. Cấu hình DNS records

## Hỗ trợ
- PHP 8.0+
- MySQL 5.7+
- Modern web browsers