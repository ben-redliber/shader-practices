// Range from https://www.joshwcomeau.com/snippets/javascript/range/
export const range = (start: number, end: number, step: number = 1) => {
  let output = [];
  if (typeof end === "undefined") {
    end = start;
    start = 0;
  }
  for (let i = start; i <= end; i += step) {
    output.push(i);
  }
  return output;
};
