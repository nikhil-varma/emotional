export const getUnique = (source, property) =>
  source
    .map((i) => i[`${property}`])
    .filter((val, idx, src) => src.indexOf(val) === idx);
