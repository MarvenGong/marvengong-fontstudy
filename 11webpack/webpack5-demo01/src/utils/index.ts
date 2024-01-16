export const add = (...numers: number[]) => {
  return numers.reduce((pre, item) => {
    return pre + item;
  }, 0)
}