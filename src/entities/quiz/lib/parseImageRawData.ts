import type { IQuizImage } from '../types'

export const imageTagMatcher = /q\d+(?:[_\d]+)?/i

const mapTagToImage = (tag: string): IQuizImage => ({
  src: `${tag}.png`,
})

export const parseImageRawData = (rawText: string): IQuizImage | null => {
  const tag = imageTagMatcher.exec(rawText)?.at(0) ?? null
  return tag ? mapTagToImage(tag) : null
}
