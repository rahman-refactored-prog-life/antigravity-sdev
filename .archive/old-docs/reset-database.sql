-- Reset database to reload content
-- Run this with: psql -U postgres -d learning_portal -f reset-database.sql

-- Disable foreign key checks temporarily
SET session_replication_role = 'replica';

-- Clear all data
TRUNCATE TABLE code_examples CASCADE;
TRUNCATE TABLE practice_questions CASCADE;
TRUNCATE TABLE topic_progress CASCADE;
TRUNCATE TABLE topics CASCADE;
TRUNCATE TABLE user_progress CASCADE;
TRUNCATE TABLE learning_modules CASCADE;

-- Re-enable foreign key checks
SET session_replication_role = 'origin';

-- Verify tables are empty
SELECT 'learning_modules' as table_name, COUNT(*) as count FROM learning_modules
UNION ALL
SELECT 'topics', COUNT(*) FROM topics
UNION ALL
SELECT 'practice_questions', COUNT(*) FROM practice_questions
UNION ALL
SELECT 'code_examples', COUNT(*) FROM code_examples;
