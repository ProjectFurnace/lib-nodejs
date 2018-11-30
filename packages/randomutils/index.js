const randomNumber = require("random-number-csprng");

module.exports.number = async (min, max) => {
    if (!min) min = 10000;
    if (!max) max = 10000000;
    const rand = await randomNumber(min,max);

    return await rand;
}