import { parseImageRawData } from './parseImageRawData'
import type { IQuizAnswer } from '../types'

/** Correct answer mark */
const CAM = '*'

export const parseAnswerRawData = (
  rawText: string,
  id: number
): IQuizAnswer => {
  const createErrorMessage = (message: string) =>
    `Failed to parse answer raw data: ${message}`

  const text = rawText.trim()

  if (!text || !text.length) {
    throw new Error(createErrorMessage('answer data string is empty'))
  } else if (!id || id < 0) {
    throw new Error(
      createErrorMessage(
        'wrong answer id, id must be a number greater than zero'
      )
    )
  }

  const correct = text.startsWith(CAM)
  const imageData = parseImageRawData(text)

  if (imageData) {
    const [image] = imageData
    return !correct //
      ? { id, image }
      : { id, image, correct }
  }

  return !correct //
    ? { id, text }
    : { id, correct, text: text.slice(1).trim() }
}
