import type { IQuizImage } from '../types'

export const imageTagMatcher = /q\d+(?:[_\d]+)?/i

const mapTagToImage = (tag: string): IQuizImage => ({
  src: `${tag}.png`,
})

export type ParseImageRawDataResult = [image: IQuizImage, text: string]

export const parseImageRawData = (
  rawText: string
): ParseImageRawDataResult | null => {
  const tag = imageTagMatcher.exec(rawText)?.at(0) ?? null
  return !tag
    ? null
    : [mapTagToImage(tag), rawText.replace(` ${tag}`, '').trim()]
}
