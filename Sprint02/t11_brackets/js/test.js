const { expect } = chai;

describe('checkBrackets function', () => {
    // Incorrect cases with different data types
    it('should return -1 for empty string input', () => {
        expect(checkBrackets('')).to.equal(-1);
    });

    // Correct cases
    it('should return 0 for string without brackets', () => {
        expect(checkBrackets('chinazes')).to.equal(-1);
    });

    it('should return -1 for number input', () => {
        expect(checkBrackets(666)).to.equal(-1);
    });

    it('should return -1 for boolean input', () => {
        expect(checkBrackets(false)).to.equal(-1);
    });

    it('should return -1 for null input', () => {
        expect(checkBrackets(null)).to.equal(-1);
    });

    it('should return -1 for undefined input', () => {
        expect(checkBrackets(undefined)).to.equal(-1);
    });

    it('should return 0 for string with balanced brackets', () => {
        expect(checkBrackets('((()))')).to.equal(0);
    });

    it('should return 1 for string with one extra opening bracket', () => {
        expect(checkBrackets('(()')).to.equal(1);
    });

    it('should return 1 for string with one extra closing bracket', () => {
        expect(checkBrackets('())')).to.equal(1);
    });

    it('should return 2 for string with multiple extra brackets', () => {
        expect(checkBrackets('(())))')).to.equal(2);
    });

    it('should return 2 for complex string with extra brackets', () => {
        expect(checkBrackets('1)()(())2(()')).to.equal(2);
    });

    it('should return 0 for string with nested brackets', () => {
        expect(checkBrackets('((()))')).to.equal(0);
    });

    it('should return 0 for string with mixed brackets', () => {
        expect(checkBrackets('()(()())')).to.equal(0);
    });

    it('should return 1 for string with unbalanced brackets', () => {
        expect(checkBrackets('(()()()))')).to.equal(1);
    });

    it('should return 1 for string with unbalanced brackets', () => {
        expect(checkBrackets('(((()))')).to.equal(1);
    });

    it('should return 5 for string with unbalanced brackets', () => {
        expect(checkBrackets('()))))')).to.equal(4);
    });
});
