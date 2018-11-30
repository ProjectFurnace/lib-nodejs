const random = require(".");

describe('random', () => {
    it('should return number between min and max', async () => {
        const number = await random.number(1, 50);
        expect(number).toBeGreaterThanOrEqual(1);
        expect(number).toBeLessThanOrEqual(50);
    });
});