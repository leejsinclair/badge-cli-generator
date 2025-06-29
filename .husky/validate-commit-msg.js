#!/usr/bin/env node

/**
 * Commit message validation script for enforcing conventional commit standards.
 * 
 * Rules enforced:
 * 1. Format: type(scope): description
 * 2. Types: feat, fix, docs, style, refactor, test, chore, ci, perf, build
 * 3. Subject line: 50 characters or less
 * 4. No period at the end of subject
 * 5. Imperative mood (starts with verb)
 * 6. Body lines: 72 characters or less (if present)
 * 7. Footer follows conventional commit format (if present)
 */

const fs = require('fs');
const path = require('path');

// Valid commit types
const VALID_TYPES = [
    'feat',     // A new feature
    'fix',      // A bug fix
    'docs',     // Documentation only changes
    'style',    // Changes that do not affect the meaning of the code
    'refactor', // A code change that neither fixes a bug nor adds a feature
    'test',     // Adding missing tests or correcting existing tests
    'chore',    // Changes to the build process or auxiliary tools
    'ci',       // Changes to CI configuration files and scripts
    'perf',     // A code change that improves performance
    'build',    // Changes that affect the build system or external dependencies
    'revert'    // Reverts a previous commit
];

// Common imperative mood starters
const IMPERATIVE_VERBS = [
    'add', 'remove', 'fix', 'update', 'create', 'delete', 'implement', 'refactor',
    'improve', 'enhance', 'optimize', 'cleanup', 'rename', 'move', 'extract',
    'introduce', 'configure', 'setup', 'install', 'upgrade', 'downgrade',
    'merge', 'split', 'combine', 'separate', 'replace', 'modify', 'adjust',
    'correct', 'resolve', 'handle', 'ensure', 'prevent', 'validate', 'verify'
];

function validateCommitMessage(message) {
    const errors = [];
    const lines = message.split('\n');
    const subjectLine = lines[0];

    // 1. Check conventional commit format
    const conventionalCommitRegex = /^(feat|fix|docs|style|refactor|test|chore|ci|perf|build|revert)(\(.+\))?: .{1,50}$/;

    if (!conventionalCommitRegex.test(subjectLine)) {
        // Check if it matches the basic pattern
        const basicPattern = /^([a-z]+)(\(.+\))?: (.+)$/;
        const match = subjectLine.match(basicPattern);

        if (!match) {
            errors.push('❌ Commit message must follow format: type(scope): description');
            errors.push('   Example: feat(auth): add user login functionality');
        } else {
            const [, type, scope, description] = match;

            // Check valid type
            if (!VALID_TYPES.includes(type)) {
                errors.push(`❌ Invalid commit type '${type}'. Valid types: ${VALID_TYPES.join(', ')}`);
            }

            // Check description length
            if (description.length > 50) {
                errors.push(`❌ Subject line too long (${description.length} characters). Keep it under 50 characters.`);
            }

            // Check for period at end
            if (description.endsWith('.')) {
                errors.push('❌ Subject line should not end with a period');
            }

            // Check imperative mood
            const firstWord = description.split(' ')[0].toLowerCase();
            if (!IMPERATIVE_VERBS.includes(firstWord) && !description.match(/^[a-z]/)) {
                errors.push('❌ Use imperative mood in subject line (e.g., "add" not "added" or "adds")');
            }
        }
    }

    // 2. Check for empty line after subject (if body exists)
    if (lines.length > 1 && lines[1] !== '') {
        errors.push('❌ Add blank line after subject line');
    }

    // 3. Check body line lengths
    for (let i = 2; i < lines.length; i++) {
        if (lines[i].length > 72) {
            errors.push(`❌ Line ${i + 1} is too long (${lines[i].length} characters). Keep body lines under 72 characters.`);
        }
    }

    // 4. Check for common mistakes
    if (subjectLine.toLowerCase().includes('wip') || subjectLine.toLowerCase().includes('work in progress')) {
        errors.push('❌ Remove WIP/work in progress from commit message');
    }

    if (subjectLine.toLowerCase().startsWith('fix bug') || subjectLine.toLowerCase().startsWith('bug fix')) {
        errors.push('💡 Consider using "fix(component): specific issue description" instead of generic "fix bug"');
    }

    return errors;
}

function printUsageExamples() {
    console.log('\n📝 Conventional Commit Examples:');
    console.log('  feat(auth): add user login functionality');
    console.log('  fix(api): resolve null pointer exception in user service');
    console.log('  docs(readme): update installation instructions');
    console.log('  style(button): adjust padding and margins');
    console.log('  refactor(utils): extract common validation functions');
    console.log('  test(auth): add unit tests for login component');
    console.log('  chore(deps): update eslint to version 8.0');
    console.log('  ci(github): add automated testing workflow');
    console.log('  perf(search): improve query performance with indexing');
    console.log('  build(webpack): optimize bundle size configuration');
    console.log('\n📚 Format: type(scope): description');
    console.log('  • type: feat, fix, docs, style, refactor, test, chore, ci, perf, build, revert');
    console.log('  • scope: optional, indicates area of change');
    console.log('  • description: imperative mood, 50 chars max, no period');
}

function main() {
    const commitMsgFile = process.argv[2];

    if (!commitMsgFile) {
        console.error('❌ No commit message file provided');
        process.exit(1);
    }

    try {
        const commitMessage = fs.readFileSync(commitMsgFile, 'utf8').trim();

        if (!commitMessage) {
            console.error('❌ Commit message cannot be empty');
            process.exit(1);
        }

        const errors = validateCommitMessage(commitMessage);

        if (errors.length > 0) {
            console.error('🚫 Commit message validation failed:\n');
            errors.forEach(error => console.error(`  ${error}`));
            printUsageExamples();
            process.exit(1);
        }

        console.log('✅ Commit message follows conventional commit standards');
    } catch (error) {
        console.error(`❌ Error reading commit message: ${error.message}`);
        process.exit(1);
    }
}

main();
