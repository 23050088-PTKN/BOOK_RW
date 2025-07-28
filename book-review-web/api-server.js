const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Database connection
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    charset: 'utf8mb4'
};

// API Routes
app.get('/api/books', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute(`
            SELECT b.*, GROUP_CONCAT(g.name) as genres 
            FROM books b 
            LEFT JOIN book_genres bg ON b.id = bg.book_id 
            LEFT JOIN genres g ON bg.genre_id = g.id 
            WHERE b.status = 'approved'
            GROUP BY b.id
        `);
        await connection.end();
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/books/:id', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute(`
            SELECT b.*, GROUP_CONCAT(g.name) as genres 
            FROM books b 
            LEFT JOIN book_genres bg ON b.id = bg.book_id 
            LEFT JOIN genres g ON bg.genre_id = g.id 
            WHERE b.id = ? AND b.status = 'approved'
            GROUP BY b.id
        `, [req.params.id]);
        await connection.end();
        res.json(rows[0] || {});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/reviews/:bookId', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute(`
            SELECT r.*, u.name as user_name 
            FROM reviews r 
            JOIN users u ON r.user_id = u.id 
            WHERE r.book_id = ?
            ORDER BY r.created_at DESC
        `, [req.params.bookId]);
        await connection.end();
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const connection = await mysql.createConnection(dbConfig);
        const [result] = await connection.execute(`
            INSERT INTO users (name, email, password) VALUES (?, ?, ?)
        `, [name, email, hashedPassword]);
        await connection.end();
        
        res.json({ success: true, userId: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute(`
            SELECT * FROM users WHERE email = ?
        `, [email]);
        await connection.end();
        
        if (rows.length === 0) {
            return res.status(401).json({ error: 'User not found' });
        }
        
        const user = rows[0];
        const validPassword = await bcrypt.compare(password, user.password);
        
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'secret');
        res.json({ success: true, token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/reviews', async (req, res) => {
    try {
        const { bookId, rating, comment } = req.body;
        const token = req.headers.authorization?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        
        const connection = await mysql.createConnection(dbConfig);
        const [result] = await connection.execute(`
            INSERT INTO reviews (book_id, user_id, rating, comment) VALUES (?, ?, ?, ?)
        `, [bookId, decoded.userId, rating, comment]);
        await connection.end();
        
        res.json({ success: true, reviewId: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Serve static files
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 