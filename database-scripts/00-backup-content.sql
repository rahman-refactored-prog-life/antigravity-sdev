-- ============================================================================
-- Backup Learning Content Data (OPTIONAL - Run before clearing)
-- ============================================================================
-- This creates a backup of your current learning content
-- Run this in pgAdmin4 BEFORE running 01-clear-and-reload-content.sql
-- ============================================================================

-- Create backup tables
CREATE TABLE IF NOT EXISTS backup_learning_modules AS SELECT * FROM learning_modules;
CREATE TABLE IF NOT EXISTS backup_topics AS SELECT * FROM topics;
CREATE TABLE IF NOT EXISTS backup_practice_questions AS SELECT * FROM practice_questions;
CREATE TABLE IF NOT EXISTS backup_code_examples AS SELECT * FROM code_examples;

-- Verify backup
SELECT 
    'backup_learning_modules' as table_name, 
    COUNT(*) as backed_up_rows 
FROM backup_learning_modules
UNION ALL
SELECT 'backup_topics', COUNT(*) FROM backup_topics
UNION ALL
SELECT 'backup_practice_questions', COUNT(*) FROM backup_practice_questions
UNION ALL
SELECT 'backup_code_examples', COUNT(*) FROM backup_code_examples;

SELECT 'SUCCESS: Backup created. You can now run 01-clear-and-reload-content.sql' as status;
