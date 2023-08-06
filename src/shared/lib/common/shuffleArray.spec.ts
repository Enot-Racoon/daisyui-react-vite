import shuffleArray from './shuffleArray'

describe('Testing function shuffleArray', () => {
  it('function shuffleArray should shuffle not empty array', () => {
    const emptyArray: number[] = []
    const notEmptyArray = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    expect(shuffleArray(emptyArray)).toEqual(emptyArray)
    expect(shuffleArray(notEmptyArray)).not.toEqual(notEmptyArray)
  })
})
