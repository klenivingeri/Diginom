export const grid = [
  [10, 10, 10, 10, 10, 9], //1
  [10, 9, 9, 9, 8, 9], //2
  [9, 9, 9, 8, 8, 8], //3
  [7, 7, 9, 8, 8, 8], //4
  [7, 7, 7, 7, 8, 8], //5
  [6, 6, 6, 7, 8, 8], //6
  [5, 5, 5, 5, 5, 5], //7
  [5, 3, 2, 4, 4, 4], //8
  [5, 3, 2, 2, 2, 2], //9
  [2, 1, 1, 1, 1, 1], //10
  [2, 1, 1, 1, 1, 1], //11
  [2, 0, 0, 0, 0, 0], //12
];

const levelColors = {
  0: "rgba(240,240,240,0.2)",
  1: "rgba(214,234,255,0.2)",
  2: "rgba(181,216,255,0.2)",
  3: "rgba(156,198,255,0.2)",
  4: "rgba(132,181,255,0.2)",
  5: "rgba(107,163,255,0.2)",
  6: "rgba(82,145,255,0.2)",
  7: "rgba(58,127,255,0.2)",
  8: "rgba(33,109,255,0.2)",
  9: "rgba(8,91,255,0.2)",
  10: "rgba(0,68,204,0.2)",
};

const b = {
  b: { borderBottom: "1px solid rgba(0,0,0,0.2)" },
  l: { borderLeft: "1px solid rgba(0,0,0,0.2)" },
  r: { borderRight: "1px solid rgba(0,0,0,0.2)" },
  t: { borderTop: "1px solid rgba(0,0,0,0.2)" },
};

export const grid1 = [
  { level: "10", bg: levelColors[10], id: "1a", border: b["b"] },
  { level: "10", bg: levelColors[10], id: "1b", border: b["b"] },
  { level: "10", bg: levelColors[10], id: "1c", border: b["b"] },
  { level: "10", bg: levelColors[10], id: "1d", border: b["b"] },
  { level: "10", bg: levelColors[10], id: "1e", border: b["b"] },
  { level: "10", bg: levelColors[10], id: "1f", border: b["b"] },

  { level: "10", bg: levelColors[10], id: "2a", border: b["b"] },
  { level: "9", bg: levelColors[9], id: "2b", border: b["l"] },
  { level: "9", bg: levelColors[9], id: "2c", border: {} },
  { level: "9", bg: levelColors[9], id: "2d", border: b["r"] },
  { level: "8", bg: levelColors[8], id: "2e", border: b["r"] },
  { level: "9", bg: levelColors[9], id: "2f", border: b["b"] },

  { level: "9", bg: levelColors[9], id: "3a", border: b["b"] },
  { level: "9", bg: levelColors[9], id: "3b", border: b["b"] },
  { level: "9", bg: levelColors[9], id: "3c", border: b["r"] },
  { level: "8", bg: levelColors[8], id: "3d", border: b["t"] },
  { level: "8", bg: levelColors[8], id: "3e", border: {} },
  { level: "8", bg: levelColors[8], id: "3f", border: {} },

  { level: "7", bg: levelColors[7], id: "4a", border: {} },
  { level: "7", bg: levelColors[7], id: "4b", border: b["r"] },
  {
    level: "9",
    bg: levelColors[9],
    id: "4c",
    border: { ...b["r"], ...b["b"] },
  },
  { level: "8", bg: levelColors[8], id: "4d", border: b["b"] },
  { level: "8", bg: levelColors[8], id: "4e", border: {} },
  { level: "8", bg: levelColors[8], id: "4f", border: {} },

  { level: "7", bg: levelColors[7], id: "5a", border: b["b"] },
  { level: "7", bg: levelColors[7], id: "5b", border: b["b"] },
  { level: "7", bg: levelColors[7], id: "5c", border: b["b"] },
  { level: "7", bg: levelColors[7], id: "5d", border: b["r"] },
  { level: "8", bg: levelColors[8], id: "5e", border: b["b"] },
  { level: "8", bg: levelColors[8], id: "5f", border: {} },

  { level: "6", bg: levelColors[6], id: "6a", border: b["b"] },
  { level: "6", bg: levelColors[6], id: "6b", border: b["b"] },
  { level: "6", bg: levelColors[6], id: "6c", border: b["b"] },
  {
    level: "7",
    bg: levelColors[7],
    id: "6d",
    border: { ...b["l"], ...b["b"] },
  },
  { level: "6", bg: levelColors[6], id: "6e", border: b["l"] },
  { level: "8", bg: levelColors[8], id: "6f", border: b["l"] },

  { level: "5", bg: levelColors[5], id: "7a", border: {} },
  { level: "5", bg: levelColors[5], id: "7b", border: b["b"] },
  { level: "5", bg: levelColors[5], id: "7c", border: b["b"] },
  { level: "5", bg: levelColors[5], id: "7d", border: b["r"] },
  { level: "6", bg: levelColors[6], id: "7e", border: b["r"] },
  { level: "5", bg: levelColors[5], id: "7f", border: b["t"] },

  { level: "5", bg: levelColors[5], id: "8a", border: b["r"] },
  { level: "3", bg: levelColors[3], id: "8b", border: b["r"] },
  { level: "2", bg: levelColors[2], id: "8c", border: b["r"] },
  { level: "4", bg: levelColors[4], id: "8d", border: b["t"] },
  { level: "4", bg: levelColors[4], id: "8e", border: b["t"] },
  { level: "4", bg: levelColors[4], id: "8f", border: b["t"] },

  { level: "5", bg: levelColors[5], id: "9a", border: b["r"] },
  { level: "4", bg: levelColors[4], id: "9b", border: b["r"] },
  { level: "2", bg: levelColors[2], id: "9c", border: {} },
  { level: "2", bg: levelColors[2], id: "9d", border: b["t"] },
  { level: "2", bg: levelColors[2], id: "9e", border: b["t"] },
  { level: "2", bg: levelColors[2], id: "9f", border: b["t"] },

  { level: "2", bg: levelColors[2], id: "10a", border: b["r"] },
  { level: "1", bg: levelColors[1], id: "10b", border: b["t"] },
  { level: "1", bg: levelColors[1], id: "10c", border: b["t"] },
  { level: "1", bg: levelColors[1], id: "10d", border: b["t"] },
  { level: "1", bg: levelColors[1], id: "10e", border: b["t"] },
  { level: "1", bg: levelColors[1], id: "10f", border: b["t"] },

  { level: "2", bg: levelColors[2], id: "11a", border: b["r"] },
  { level: "1", bg: levelColors[1], id: "11b", border: {} },
  { level: "1", bg: levelColors[1], id: "11c", border: {} },
  { level: "1", bg: levelColors[1], id: "11d", border: {} },
  { level: "1", bg: levelColors[1], id: "11e", border: {} },
  { level: "1", bg: levelColors[1], id: "11f", border: {} },

  { level: "2", bg: levelColors[2], id: "12a", border: b["r"] },
  { level: "0", bg: levelColors[0], id: "12b", border: b["t"] },
  { level: "0", bg: levelColors[0], id: "12c", border: b["t"] },
  { level: "0", bg: levelColors[0], id: "12d", border: b["t"] },
  { level: "0", bg: levelColors[0], id: "12e", border: b["t"] },
  { level: "0", bg: levelColors[0], id: "12f", border: b["t"] },
];

export const grid2 = [
  [10, 10, 10, 10, 10, 9],
  [10, 9, 9, 9, 8, 9],
  [9, 9, 9, 8, 8, 8],
  [7, 7, 9, 8, 8, 8],
  [7, 7, 7, 7, 8, 8],
  [6, 6, 6, 7, 8, 8],
  [5, 5, 5, 5, 5, 5],
  [5, 3, 2, 4, 4, 4],
  [5, 3, 2, 2, 2, 2],
  [2, 1, 1, 1, 1, 1],
  [2, 1, 1, 1, 1, 1],
  [2, 0, 0, 0, 0, 0],
];
