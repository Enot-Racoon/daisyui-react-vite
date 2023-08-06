import { parseImageRawData } from './parseImageRawData'
import { parseAnswerRawData } from './parseAnswerRawData'
import type { IQuizQuestion } from '../types'

/** End of line */
export const EOL = '\n'

export const parseQuestionRawData = (rawText: string): IQuizQuestion => {
  const createErrorMessage = (message: string) =>
    `Failed to parse question data: ${message}`

  const trimedText = rawText.trim()

  if (!trimedText || !trimedText.length) {
    throw new Error(createErrorMessage('question data string is empty'))
  }

  const [rawQuestionsText, ...rawAnswers] = trimedText.split(EOL)
  const [idStrind, text] = rawQuestionsText
    .trim()
    .split('.')
    .map(s => s.trim())

  if (!text || !text.length) {
    throw new Error(
      createErrorMessage('question raw text line string is empty')
    )
  }

  if (rawAnswers.length < 2) {
    throw new Error(createErrorMessage('less than two answers found - too few'))
  }

  const id = parseInt(idStrind, 10)
  if (!id || id < 0) {
    throw new Error(
      createErrorMessage(
        'wrong question id, id must be a number greater than zero'
      )
    )
  }

  const answers = rawAnswers.map((rawAnswerData, key) =>
    parseAnswerRawData(rawAnswerData, key + 1)
  )

  // todo: must have more than zero correct answers
  // todo: remove image tag from text
  const image = parseImageRawData(text)

  return !image //
    ? { id, text, answers }
    : { id, text, image, answers }
}
