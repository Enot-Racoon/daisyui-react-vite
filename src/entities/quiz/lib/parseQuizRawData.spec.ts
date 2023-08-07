import { parseQuizRawData } from './parseQuizRawData'

describe('Testing parser parseQuizRawData', () => {
  it('parse correct/uncorrected data', () => {
    expect(() => parseQuizRawData('')).toThrowError()
    expect(() => parseQuizRawData(' ')).toThrowError()
    expect(() =>
      parseQuizRawData(`1. Question 1
Answer 1.1
Answer 1.2
`)
    ).toThrowError()

    expect(() =>
      parseQuizRawData(`1. Question 1
Answer 1.1
*Answer 1.2
`)
    ).toThrowError()

    expect(
      parseQuizRawData(`1. Question 1
Answer 1.1
*Answer 1.2

2. Question 2
*Answer 2.1
Answer 2.2
`)
    ).toEqual([
      {
        answers: [
          { id: 1, text: 'Answer 1.1' },
          { correct: true, id: 2, text: 'Answer 1.2' },
        ],
        id: 1,
        text: 'Question 1',
      },
      {
        answers: [
          { correct: true, id: 1, text: 'Answer 2.1' },
          { id: 2, text: 'Answer 2.2' },
        ],
        id: 2,
        text: 'Question 2',
      },
    ])
  })
})
