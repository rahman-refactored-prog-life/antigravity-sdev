-- ============================================================================
-- Clear Learning Content Data
-- ============================================================================
-- Purpose: Clear all learning content to reload with updated content files
-- Run this in pgAdmin4 Query Tool on the 'learning_portal' database
-- After running this, restart the Spring Boot application to reload content
-- ============================================================================

BEGIN;

-- Delete all learning content (in correct order for foreign keys)
DELETE FROM code_examples;
DELETE FROM practice_questions;
DELETE FROM topic_progress;
DELETE FROM topics;
DELETE FROM user_progress;
DELETE FROM learning_modules;

-- Reset auto-increment sequences
ALTER SEQUENCE IF EXISTS learning_modules_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS topics_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS practice_questions_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS code_examples_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS topic_progress_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS user_progress_id_seq RESTART WITH 1;

COMMIT;

-- Verify all tables are empty
SELECT 
    'learning_modules' as table_name, 
    COUNT(*) as count 
FROM learning_modules
UNION ALL
SELECT 'topics', COUNT(*) FROM topics
UNION ALL
SELECT 'practice_questions', COUNT(*) FROM practice_questions
UNION ALL
SELECT 'code_examples', COUNT(*) FROM code_examples
UNION ALL
SELECT 'topic_progress', COUNT(*) FROM topic_progress
UNION ALL
SELECT 'user_progress', COUNT(*) FROM user_progress;

-- Success message
SELECT 'SUCCESS: All learning content cleared. Restart the application to reload.' as status;
