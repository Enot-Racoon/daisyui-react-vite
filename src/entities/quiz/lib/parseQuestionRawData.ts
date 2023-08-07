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
  const [idString, text] = rawQuestionsText
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

  const id = parseInt(idString, 10)
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

  if (!answers.some(({ correct }) => correct)) {
    throw new Error(
      createErrorMessage('no correct answers found must be at least one')
    )
  }

  const imageData = parseImageRawData(text)
  if (imageData) {
    const [image, newText] = imageData
    return { id, text: newText, image, answers }
  }

  return { id, text, answers }
}
