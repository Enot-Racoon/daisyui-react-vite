import { parseQuestionRawData, EOL } from './parseQuestionRawData'

describe('Testing parser parseQuestionRawData', () => {
  it('parse correct/uncorrect data', () => {
    expect(() => parseQuestionRawData('')).toThrowError()
    expect(() => parseQuestionRawData(' ')).toThrowError()
    expect(() => parseQuestionRawData('  ABC  ')).toThrowError()
    expect(() => parseQuestionRawData('  A.ABC  ')).toThrowError()
    expect(() =>
      parseQuestionRawData(`  ${[' 1.ABC  ', 'answer1'].join(EOL)}  `)
    ).toThrowError()
    expect(() =>
      parseQuestionRawData(
        `  ${[' 2   .   ABC QWERTy ', 'answer1', 'answer2'].join(EOL)}  `
      )
    ).not.toThrowError()

    expect(
      parseQuestionRawData(
        `  ${['  2 . ABC ', ' answer 1 ', ' answer 2 ', ' *answer 3 '].join(
          EOL
        )}  `
      )
    ).toEqual({
      id: 2,
      text: 'ABC',
      answers: [
        { id: 1, text: 'answer 1' },
        { id: 2, text: 'answer 2' },
        { correct: true, id: 3, text: 'answer 3' },
      ],
    })
    expect(
      parseQuestionRawData(
        `  ${['  2 . ABC Q1 ', ' Q1_1 ', ' Q1_2 ', ' *Q1_3 '].join(EOL)}  `
      )
    ).toEqual({
      id: 2,
      text: 'ABC Q1', // todo: remove image tag 'Q1'
      image: { src: 'Q1.png' },
      answers: [
        { id: 1, image: { src: 'Q1_1.png' } },
        { id: 2, image: { src: 'Q1_2.png' } },
        { correct: true, id: 3, image: { src: 'Q1_3.png' } },
      ],
    })
  })
})
