// Import the statement function
import statement from './statement';

// Import JSON data directly
import plays from './test_data/plays.json';
import invoices from './test_data/invoices.json';

// Expected output
const expectedOutput = `Statement for BigCo
 Hamlet: $650.00 (55 seats)
 As You Like It: $580.00 (35 seats)
 Othello: $500.00 (40 seats)
Amount owed is $1,730.00
You earned 47 credits
`;

// Test suite
describe('Theatre Company Billing', () => {
    it('should correctly calculate statement for BigCo', () => {
        // Since invoices is an array, access the first item for this specific invoice
        const result = statement(invoices[0], plays);
        expect(result).toBe(expectedOutput);
    });
});
