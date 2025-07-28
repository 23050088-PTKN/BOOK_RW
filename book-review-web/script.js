// API Base URL
const API_BASE_URL = window.location.origin;

// Authentication
let currentUser = null;
let authToken = localStorage.getItem('authToken');

// Check if user is logged in
if (authToken) {
    currentUser = JSON.parse(localStorage.getItem('user'));
    updateUIForLoggedInUser();
}

// API Functions
async function fetchBooks() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/books`);
        const books = await response.json();
        displayBooks(books);
    } catch (error) {
        console.error('Error fetching books:', error);
    }
}

async function fetchBookDetails(bookId) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/books/${bookId}`);
        const book = await response.json();
        return book;
    } catch (error) {
        console.error('Error fetching book details:', error);
        return null;
    }
}

async function fetchReviews(bookId) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/reviews/${bookId}`);
        const reviews = await response.json();
        return reviews;
    } catch (error) {
        console.error('Error fetching reviews:', error);
        return [];
    }
}

async function registerUser(userData) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
}

async function loginUser(credentials) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
}

async function submitReview(reviewData) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(reviewData)
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error submitting review:', error);
        throw error;
    }
}

// UI Functions
function displayBooks(books) {
    const bookGrid = document.getElementById('bookGrid');
    if (!bookGrid) return;

    bookGrid.innerHTML = '';
    
    books.forEach(book => {
        const bookCard = createBookCard(book);
        bookGrid.appendChild(bookCard);
    });
}

function createBookCard(book) {
    const card = document.createElement('div');
    card.className = 'book-card';
    card.setAttribute('data-genre', book.genres || '');
    card.setAttribute('data-book-id', book.id);
    
    card.innerHTML = `
        <a href="book-detail.html?id=${book.id}">
            <img src="${book.cover_image}" alt="${book.title}" class="book-image">
        </a>
        <div class="book-content">
            <h3 class="book-title">
                <a href="book-detail.html?id=${book.id}" class="book-title-link">${book.title} (${book.publication_year})</a>
            </h3>
            <p class="book-author">Tác giả: ${book.author}</p>
            <div class="rating-stars" data-book-id="${book.id}">
                <span class="rating-score">${book.rating}</span>
            </div>
            <p class="book-description">${book.description}</p>
            <div class="book-actions">
                <button class="btn-view-reviews" data-book-id="${book.id}">Xem đánh giá</button>
                <button class="btn-save">
                    <i class="fas fa-bookmark"></i> Lưu
                </button>
            </div>
        </div>
    `;
    
    return card;
}

function updateUIForLoggedInUser() {
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const userMenu = document.getElementById('userMenu');
    const userGreeting = document.querySelector('.user-greeting');
    
    if (loginBtn) loginBtn.style.display = 'none';
    if (registerBtn) registerBtn.style.display = 'none';
    if (userMenu) userMenu.classList.remove('hidden');
    if (userGreeting && currentUser) {
        userGreeting.textContent = `Xin chào, ${currentUser.name}!`;
    }
}

function showLoginModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Đăng nhập</h2>
            <form id="loginForm">
                <input type="email" placeholder="Email" name="email" required>
                <input type="password" placeholder="Mật khẩu" name="password" required>
                <button type="submit">Đăng nhập</button>
            </form>
            <p>Chưa có tài khoản? <a href="#" id="showRegister">Đăng ký</a></p>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Handle form submission
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        try {
            const result = await loginUser({
                email: formData.get('email'),
                password: formData.get('password')
            });
            
            if (result.success) {
                authToken = result.token;
                currentUser = result.user;
                localStorage.setItem('authToken', authToken);
                localStorage.setItem('user', JSON.stringify(currentUser));
                updateUIForLoggedInUser();
                modal.remove();
            } else {
                alert('Đăng nhập thất bại: ' + result.error);
            }
        } catch (error) {
            alert('Đăng nhập thất bại: ' + error.message);
        }
    });
    
    // Close modal
    modal.querySelector('.close').onclick = () => modal.remove();
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
}

function showRegisterModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Đăng ký</h2>
            <form id="registerForm">
                <input type="text" placeholder="Họ tên" name="name" required>
                <input type="email" placeholder="Email" name="email" required>
                <input type="password" placeholder="Mật khẩu" name="password" required>
                <button type="submit">Đăng ký</button>
            </form>
            <p>Đã có tài khoản? <a href="#" id="showLogin">Đăng nhập</a></p>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Handle form submission
    document.getElementById('registerForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        try {
            const result = await registerUser({
                name: formData.get('name'),
                email: formData.get('email'),
                password: formData.get('password')
            });
            
            if (result.success) {
                alert('Đăng ký thành công! Vui lòng đăng nhập.');
                modal.remove();
                showLoginModal();
            } else {
                alert('Đăng ký thất bại: ' + result.error);
            }
        } catch (error) {
            alert('Đăng ký thất bại: ' + error.message);
        }
    });
    
    // Close modal
    modal.querySelector('.close').onclick = () => modal.remove();
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Load books on page load
    fetchBooks();
    
    // Login/Register buttons
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', showLoginModal);
    }
    
    if (registerBtn) {
        registerBtn.addEventListener('click', showRegisterModal);
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            currentUser = null;
            authToken = null;
            location.reload();
        });
    }
    
    // Genre filters
    const genreFilters = document.querySelectorAll('.genre-filter');
    genreFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            const genre = this.getAttribute('data-genre');
            filterBooksByGenre(genre);
            
            // Update active filter
            genreFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Search functionality
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    
    if (searchButton && searchInput) {
        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
});

function filterBooksByGenre(genre) {
    const bookCards = document.querySelectorAll('.book-card');
    
    bookCards.forEach(card => {
        if (genre === 'all' || card.getAttribute('data-genre').includes(genre)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function performSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const bookCards = document.querySelectorAll('.book-card');
    
    bookCards.forEach(card => {
        const title = card.querySelector('.book-title').textContent.toLowerCase();
        const author = card.querySelector('.book-author').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || author.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Mobile menu
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
}