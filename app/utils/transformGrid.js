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

export function transformGrid(rawGrid) {
  return rawGrid.flatMap((row) =>
    row.map((level) => ({
      level,
      bg: levelColors[level] || "transparent",
    }))
  );
}
