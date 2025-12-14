#!/bin/bash
# Cleanup unnecessary documentation files
# These are old status/planning files that are no longer needed

echo "🧹 Cleaning up workspace..."
echo ""

# Create archive directory for old docs
mkdir -p .archive/old-docs

# Move old phase 1 documentation
echo "📦 Archiving Phase 1 documentation..."
mv PHASE_1_COMPLETE.md .archive/old-docs/ 2>/dev/null
mv PHASE_1_COMPLETION_PLAN.md .archive/old-docs/ 2>/dev/null
mv PHASE_1_FINAL_AUDIT.md .archive/old-docs/ 2>/dev/null
mv PHASE_1_VALIDATION_REPORT.md .archive/old-docs/ 2>/dev/null
mv PHASE_2_PREPARATION.md .archive/old-docs/ 2>/dev/null
mv APPLICATION_READY.md .archive/old-docs/ 2>/dev/null
mv DEFERRED_TASKS_PLAN.md .archive/old-docs/ 2>/dev/null

# Move old content methodology drafts (keep only V3_FINAL)
echo "📦 Archiving old content methodology drafts..."
mv CONTENT_CREATION_METHODOLOGY.md .archive/old-docs/ 2>/dev/null
mv ENHANCED_CONTENT_METHODOLOGY.md .archive/old-docs/ 2>/dev/null

# Move old template files (keep only the final ones)
echo "📦 Archiving old template files..."
mv TEMPLATE_COMPLETION_GUIDE.md .archive/old-docs/ 2>/dev/null
mv TEMPLATE_READY_SUMMARY.md .archive/old-docs/ 2>/dev/null
mv TEMPLATE_UNIVERSAL_CONFIRMATION.md .archive/old-docs/ 2>/dev/null
mv TOPIC_CONTENT_TEMPLATE_PART2.md .archive/old-docs/ 2>/dev/null
mv TOPIC_CONTENT_TEMPLATE_PART3.md .archive/old-docs/ 2>/dev/null
mv UNIVERSAL_TEMPLATE_EXAMPLES.md .archive/old-docs/ 2>/dev/null
mv VARIABLES_TOPIC_COMPLETE.md .archive/old-docs/ 2>/dev/null

# Move old database scripts (replaced by AdminController)
echo "📦 Archiving old database scripts..."
mv clear-data.sh .archive/old-docs/ 2>/dev/null
mv reload-content.sh .archive/old-docs/ 2>/dev/null
mv reset-database.sql .archive/old-docs/ 2>/dev/null

# Move misc files
echo "📦 Archiving miscellaneous files..."
mv aws-quicksuite-html-code.html .archive/old-docs/ 2>/dev/null

echo ""
echo "✅ Cleanup complete!"
echo ""
echo "📁 Archived files moved to: .archive/old-docs/"
echo ""
echo "🗂️  Remaining important files:"
echo "  - README.md (project overview)"
echo "  - CONTENT_METHODOLOGY_V3_FINAL.md (content creation guide)"
echo "  - TOPIC_CONTENT_TEMPLATE.md (template for topics)"
echo "  - TESTING_GUIDE.md (testing documentation)"
echo "  - my-reference (your personal notes)"
echo "  - temporary.md (session context)"
echo "  - *.sh scripts (database and app management)"
echo ""
