# Import Database bằng Command Line

## Với MySQL
```bash
# Cài đặt MySQL client nếu chưa có
# Windows: Tải MySQL Workbench
# Mac: brew install mysql-client
# Linux: sudo apt-get install mysql-client

# Import database
mysql -h your-db-host.render.com -u your-username -p your-database-name < database_setup.sql
```

## Với PostgreSQL
```bash
# Cài đặt PostgreSQL client
# Windows: Tải pgAdmin
# Mac: brew install postgresql
# Linux: sudo apt-get install postgresql-client

# Import database
psql "postgresql://username:password@host:port/database" < database_setup.sql
```

## Thay thế thông tin:
- `your-db-host.render.com`: Host từ Render
- `your-username`: Username từ Render
- `your-database-name`: Tên database (book_review_system1)
- `password`: Password từ Render
- `port`: 3306 (MySQL) hoặc 5432 (PostgreSQL) 