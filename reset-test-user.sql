-- Reset test user with known password
-- Password will be: password123
-- BCrypt hash for "password123"

DELETE FROM users WHERE username = 'testuser' OR email = 'test@example.com';

INSERT INTO users (username, email, password_hash, full_name, roles, created_at, updated_at)
VALUES (
  'testuser',
  'test@example.com',
  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
  'Test User',
  'USER',
  NOW(),
  NOW()
);

SELECT 'User reset successfully!' as message;
SELECT id, username, email, full_name, roles FROM users WHERE username = 'testuser';
