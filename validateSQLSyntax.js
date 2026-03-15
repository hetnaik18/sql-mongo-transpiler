// SQL Syntax Validator for incomplete queries
// Detects missing table after FROM, incomplete WHERE, etc.

function validateSQLSyntax(tokens) {
    // Check for SELECT
    const hasSelect = tokens.some(t => t.upper === 'SELECT');
    if (!hasSelect) {
        return 'Missing SELECT clause';
    }

    // Check FROM clause completeness
    const fromIndex = tokens.findIndex(t => t.upper === 'FROM');
    if (fromIndex !== -1) {
        if (fromIndex + 1 >= tokens.length || !tokens[fromIndex + 1].value.match(/^\\w+$/)) {
            return 'Incomplete syntax (Innovation parameter): Missing table after FROM';
        }
    }

    // Check WHERE clause completeness
    const whereIndex = tokens.findIndex(t => t.upper === 'WHERE');
    if (whereIndex !== -1) {
        if (whereIndex + 3 >= tokens.length) {
            return 'Incomplete syntax (Innovation parameter): Incomplete WHERE clause';
        }
        const field = tokens[whereIndex + 1];
        const op = tokens[whereIndex + 2];
        const value = tokens[whereIndex + 3];
        if (!field || !op || !value || field.type !== 'identifier' || op.type !== 'operator') {
            return 'Incomplete syntax (Innovation parameter): Malformed WHERE condition';
        }
    }

    return null; // Valid
}

