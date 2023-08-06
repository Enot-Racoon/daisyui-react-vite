import { parseAnswerRawData } from './parseAnswerRawData'

describe('Testing parser parseAnswerRawData', () => {
  it('parse correct/uncorrect data', () => {
    expect(() => parseAnswerRawData('', 1)).toThrowError()
    expect(() => parseAnswerRawData(' ', 1)).toThrowError()
    expect(() => parseAnswerRawData(' Answer ', 0)).toThrowError()
    expect(() => parseAnswerRawData(' Answer ', -1)).toThrowError()
    expect(parseAnswerRawData(' Answer ', 1)).toEqual({
      id: 1,
      text: 'Answer',
    })
    expect(parseAnswerRawData(' Awesome Answer ', 1)).toEqual({
      id: 1,
      text: 'Awesome Answer',
    })
    expect(parseAnswerRawData('  *   Awesome Answer ', 1)).toMatchObject({
      id: 1,
      correct: true,
      text: 'Awesome Answer',
    })
    expect(parseAnswerRawData('  Q1 ', 42)).toMatchObject({
      id: 42,
      image: { src: 'Q1.png' },
    })
    expect(parseAnswerRawData('  Q1_2 ', 42)).toMatchObject({
      id: 42,
      image: { src: 'Q1_2.png' },
    })
    expect(parseAnswerRawData('  *   Q1_2 ', 42)).toMatchObject({
      id: 42,
      correct: true,
      image: { src: 'Q1_2.png' },
    })
    expect(parseAnswerRawData('  Q_1_2 ', 42)).toMatchObject({
      id: 42,
      text: 'Q_1_2',
    })
  })
})
