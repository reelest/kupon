/**
 * Python range function
 * @param {number} start
 * @param {number} stop
 * @returns {number[]}
 */
export default function range(start, stop = false) {
  if (stop == false) [start, stop] = [0, start];
  const m = [];
  for (var i = start; i < stop; i++) {
    m.push(i);
  }
  return m;
}
