import { parseQuestionRawData } from './parseQuestionRawData'
import type Types from '../types'

/** Empty line delimiter */
export const ELD = '\n\n'

export const parseQuizRawData = (rawText: string): Types.IQuizQuestion[] => {
  const createErrorMessage = (message: string) =>
    `Failed to quiz questions data: ${message}`

  if (!rawText || !rawText.length) {
    throw new Error(createErrorMessage('questions data string is empty'))
  }

  const rawQuestions = rawText.split(ELD)

  if (rawQuestions.length < 2) {
    throw new Error(
      createErrorMessage('less than two questions found - too few')
    )
  }

  return rawQuestions.map(parseQuestionRawData)
}
