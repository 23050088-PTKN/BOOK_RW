# Cách Import Schema khi không có nút Connect

## Phương pháp 1: Sử dụng External Database URL

### Bước 1: Lấy thông tin kết nối
1. Trong database dashboard, tìm phần "External Database URL"
2. Copy URL này (dạng: `postgresql://username:password@host:port/database`)

### Bước 2: Sử dụng Database Client
**Với MySQL:**
1. Tải MySQL Workbench: https://dev.mysql.com/downloads/workbench/
2. Tạo connection mới:
   - Host: `your-db-host.render.com`
   - Port: `3306`
   - Username: `your-username`
   - Password: `your-password`
3. Kết nối và import file `simple_setup.sql`

**Với PostgreSQL:**
1. Tải pgAdmin: https://www.pgadmin.org/download/
2. Tạo connection mới với thông tin từ Render
3. Import file `simple_setup.sql`

## Phương pháp 2: Sử dụng Command Line

### Windows:
```bash
# Cài đặt MySQL client
# Tải từ: https://dev.mysql.com/downloads/mysql/

# Import database
mysql -h your-db-host.render.com -u your-username -p your-database-name < simple_setup.sql
```

### Mac/Linux:
```bash
# Cài đặt MySQL client
# Mac: brew install mysql-client
# Linux: sudo apt-get install mysql-client

# Import database
mysql -h your-db-host.render.com -u your-username -p your-database-name < simple_setup.sql
```

## Phương pháp 3: Sử dụng Online SQL Editor
1. Truy cập: https://www.db-fiddle.com/
2. Chọn MySQL version
3. Copy nội dung file `simple_setup.sql`
4. Paste và chạy

## Phương pháp 4: Tạo Database trực tiếp trong code
Thêm đoạn code này vào file PHP để tự động tạo database:

```php
<?php
// Tự động tạo database nếu chưa có
$pdo = new PDO("mysql:host=$host", $username, $password);
$pdo->exec("CREATE DATABASE IF NOT EXISTS $dbname");
$pdo->exec("USE $dbname");

// Tạo các bảng
$sql = file_get_contents('simple_setup.sql');
$pdo->exec($sql);
?>
``` 