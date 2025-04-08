export const getRandom = (min = 1000, max = 10000) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

