export const shuffleArray = <T>(
  array: Array<T>,
  randomizer: () => number = Math.random
): Array<T> => {
  return array
    .map(value => ({ value, sort: randomizer() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

export default shuffleArray
