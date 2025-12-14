#!/bin/bash
# Clear all learning portal data to reload with new content

echo "Clearing learning portal data..."

# Use the database connection from application.yml
PGPASSWORD=postgres psql -h localhost -U postgres -d learning_portal << EOF
-- Delete in correct order (respecting foreign keys)
DELETE FROM code_examples;
DELETE FROM practice_questions;
DELETE FROM topic_progress;
DELETE FROM topics;
DELETE FROM user_progress;
DELETE FROM learning_modules;

-- Verify
SELECT 'Modules' as table_name, COUNT(*) as remaining FROM learning_modules
UNION ALL
SELECT 'Topics', COUNT(*) FROM topics
UNION ALL
SELECT 'Questions', COUNT(*) FROM practice_questions
UNION ALL
SELECT 'Code Examples', COUNT(*) FROM code_examples;
EOF

echo "Data cleared! Restart the application to reload with new content."
