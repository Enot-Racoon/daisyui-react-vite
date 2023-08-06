export * as default from './types'

interface IQuizEntity {
  readonly id: number
}

export interface IQuizImage {
  readonly src: string
}

interface IQuizBaseAnswer extends IQuizEntity {
  readonly correct?: true
}

export interface IQuizTextAnswer extends IQuizBaseAnswer {
  readonly text: string
}

export interface IQuizImageAnswer extends IQuizBaseAnswer {
  readonly image: IQuizImage
}

export type IQuizAnswer = IQuizTextAnswer | IQuizImageAnswer

export type IQuizAnswerType<T extends IQuizAnswer> = T extends IQuizTextAnswer
  ? IQuizTextAnswer
  : IQuizImageAnswer

export interface IQuizQuestion extends IQuizEntity {
  readonly text: string
  readonly image?: IQuizImage
  readonly answers: IQuizAnswer[]
}

export interface IQuizCategory extends IQuizEntity {
  readonly name: string
  readonly questions: IQuizQuestion[]
}
