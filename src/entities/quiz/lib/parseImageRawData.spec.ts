import { parseImageRawData, imageTagMatcher } from './parseImageRawData'

describe('Testing parser parseImageRawData', () => {
  const aroundSomeText = (s: string) => ['some', s, 'text'].join(' ')

  it('image matcher return image tag from text', () => {
    expect(imageTagMatcher.exec(aroundSomeText('q12'))).toEqual(
      expect.arrayContaining(['q12'])
    )
    expect(imageTagMatcher.exec(aroundSomeText('Q12'))).toEqual(
      expect.arrayContaining(['Q12'])
    )
    expect(imageTagMatcher.exec(aroundSomeText('Q12_'))).toEqual(
      expect.arrayContaining(['Q12_'])
    )
    expect(imageTagMatcher.exec(aroundSomeText('q12_1'))).toEqual(
      expect.arrayContaining(['q12_1'])
    )
    expect(imageTagMatcher.exec(aroundSomeText('q12__1'))).toEqual(
      expect.arrayContaining(['q12__1'])
    )
    expect(imageTagMatcher.exec(aroundSomeText('Q12_11'))).toEqual(
      expect.arrayContaining(['Q12_11'])
    )
    expect(imageTagMatcher.exec(aroundSomeText('Q12_11_'))).toEqual(
      expect.arrayContaining(['Q12_11_'])
    )
    expect(imageTagMatcher.exec(aroundSomeText('Q12_11_1'))).toEqual(
      expect.arrayContaining(['Q12_11_1'])
    )

    expect(imageTagMatcher.test(aroundSomeText('q 12__1'))).toBeFalsy()
    expect(imageTagMatcher.test(aroundSomeText('Q_12_11'))).toBeFalsy()
    expect(imageTagMatcher.test(aroundSomeText('Q__12_11_'))).toBeFalsy()
  })

  it('must return null on empty string', () => {
    expect(parseImageRawData(aroundSomeText(''))).toBeNull()
    expect(parseImageRawData(aroundSomeText(' '))).toBeNull()
    expect(parseImageRawData(aroundSomeText('   '))).toBeNull()
    expect(parseImageRawData(aroundSomeText('q 12__1'))).toBeNull()
    expect(parseImageRawData(aroundSomeText('Q_12_11'))).toBeNull()
    expect(parseImageRawData(aroundSomeText('Q__12_11_'))).toBeNull()

    expect(parseImageRawData(aroundSomeText('q12'))).toEqual([
      { src: 'q12.png' },
      'some text',
    ])
    expect(parseImageRawData(aroundSomeText('Q12'))).toEqual([
      { src: 'Q12.png' },
      'some text',
    ])
    expect(parseImageRawData(aroundSomeText('Q12_'))).toEqual([
      { src: 'Q12_.png' },
      'some text',
    ])
    expect(parseImageRawData(aroundSomeText('q12_1'))).toEqual([
      { src: 'q12_1.png' },
      'some text',
    ])
    expect(parseImageRawData(aroundSomeText('q12__1'))).toEqual([
      { src: 'q12__1.png' },
      'some text',
    ])
    expect(parseImageRawData(aroundSomeText('q12_11'))).toEqual([
      { src: 'q12_11.png' },
      'some text',
    ])
    expect(parseImageRawData(aroundSomeText('q12_11_'))).toEqual([
      { src: 'q12_11_.png' },
      'some text',
    ])
    expect(parseImageRawData(aroundSomeText('q12_11_1'))).toEqual([
      { src: 'q12_11_1.png' },
      'some text',
    ])
  })
})
