-- Clear all learning content data to reload with updated content
-- Run with: PGPASSWORD=password psql -h localhost -U postgres -d learning_portal -f database-scripts/clear-learning-data.sql

BEGIN;

-- Delete in correct order (respecting foreign keys)
DELETE FROM code_examples;
DELETE FROM practice_questions;
DELETE FROM topic_progress;
DELETE FROM topics;
DELETE FROM user_progress;
DELETE FROM learning_modules;

-- Reset sequences
ALTER SEQUENCE IF EXISTS learning_modules_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS topics_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS practice_questions_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS code_examples_id_seq RESTART WITH 1;

COMMIT;

-- Verify tables are empty
SELECT 'learning_modules' as table_name, COUNT(*) as count FROM learning_modules
UNION ALL
SELECT 'topics', COUNT(*) FROM topics
UNION ALL
SELECT 'practice_questions', COUNT(*) FROM practice_questions
UNION ALL
SELECT 'code_examples', COUNT(*) FROM code_examples;

-- Show success message
\echo 'Learning content data cleared successfully!'
\echo 'Restart the application to reload with new content from content/java/ directory'
