import quizRawData from './questions'
import { parseQuizRawData } from '~/entities/quiz'

describe('Testing asset quiz questions raw data', () => {
  it('Each question must have four answers', () => {
    expect(
      parseQuizRawData(quizRawData).every(({ answers }) => answers.length === 4)
    ).toBeTruthy()
  })

  it('Each question must have only one answer', () => {
    expect(
      parseQuizRawData(quizRawData).every(
        ({ answers }) => answers.filter(({ correct }) => correct).length === 1
      )
    ).toBeTruthy()
  })
})
