# Hướng dẫn Import Database Schema

## Cách 1: Sử dụng phpMyAdmin (nếu có)
1. Truy cập phpMyAdmin
2. Tạo database mới
3. Import file `database_setup.sql`

## Cách 2: Sử dụng Command Line
```bash
# Với PostgreSQL
psql "postgresql://username:password@host:port/database" < database_setup.sql

# Với MySQL
mysql -h host -u username -p database < database_setup.sql
```

## Cách 3: Sử dụng Database Client
1. Kết nối database bằng pgAdmin (PostgreSQL) hoặc MySQL Workbench
2. Chạy script SQL từ file `database_setup.sql`

## Cách 4: Sử dụng Render Console
1. Trong database dashboard, click "Connect"
2. Chọn "Render Console"
3. Copy nội dung file `database_setup.sql` và paste vào console
4. Execute script

## Lưu ý:
- Đảm bảo database đã được tạo trước khi import
- Kiểm tra encoding UTF-8 cho tiếng Việt
- Backup database trước khi thay đổi 