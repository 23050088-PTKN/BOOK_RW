<?php
require_once 'config/database.php';

// Test database connection
$database = new Database();
$result = $database->testConnection();

if ($result) {
    echo "<h2>✅ Database connection successful!</h2>";
    echo "<p>Your database is properly configured.</p>";
} else {
    echo "<h2>❌ Database connection failed!</h2>";
    echo "<p>Please check your environment variables:</p>";
    echo "<ul>";
    echo "<li>DB_HOST: " . (getenv('DB_HOST') ?: 'Not set') . "</li>";
    echo "<li>DB_NAME: " . (getenv('DB_NAME') ?: 'Not set') . "</li>";
    echo "<li>DB_USER: " . (getenv('DB_USER') ?: 'Not set') . "</li>";
    echo "<li>DB_PASS: " . (getenv('DB_PASS') ? 'Set' : 'Not set') . "</li>";
    echo "</ul>";
}
?> 