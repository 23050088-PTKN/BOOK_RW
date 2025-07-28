# Hướng dẫn Deploy lên Render

## Bước 1: Chuẩn bị Repository
1. Push code lên GitHub/GitLab
2. Đảm bảo có các file sau trong repository:
   - `render.yaml`
   - `composer.json`
   - `.gitignore`

## B 2: Tạo Database trên Render
1. Đăng nhập vào [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "PostgreSQL" hoặc "MySQL"
3. Đặt tên database: `book-review-db`
4. Ghi nhớ thông tin kết nối:
   - Database URL
   - Host
   - Database name
   - Username
   - Password

## Bước 3: Deploy Web Service
1. Trong Render Dashboard, click "New +" → "Web Service"
2. Connect với GitHub/GitLab repository
3. Cấu hình:
   - **Name**: `book-review-web`
   - **Environment**: `PHP`
   - **Build Command**: `composer install`
   - **Start Command**: `php -S 0.0.0.0:$PORT`

## Bước 4: Cấu hình Environment Variables
Trong web service settings, thêm các environment variables:
- `DB_HOST`: Host của database
- `DB_NAME`: Tên database
- `DB_USER`: Username database
- `DB_PASS`: Password database

## Bước 5: Cấu hình Custom Domain
1. Trong web service settings, click "Settings"
2. Scroll xuống "Custom Domains"
3. Click "Add Domain"
4. Nhập domain của bạn (ví dụ: `bookreview.com`)
5. Cấu hình DNS records theo hướng dẫn của Render

## Bước 6: DNS Configuration
Thêm CNAME record trong DNS provider:
- **Name**: `@` hoặc `www`
- **Value**: `your-app-name.onrender.com`

## Lưu ý quan trọng:
- Đảm bảo database đã được tạo trước khi deploy web service
- Kiểm tra logs nếu có lỗi
- Test kết nối database sau khi deploy 