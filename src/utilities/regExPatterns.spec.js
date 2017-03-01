//import patterns from './regExPatterns'

describe('arrays are objects', () => {
  it('should allow proeprties to be added', () => {
    let anArray = [1,2,3]

    expect(anArray.length).toBe(3)
    expect(typeof anArray).toBe("object")

    anArray.someProperty = "a property value"

    expect(anArray.someProperty).toBe("a property value")
    expect(anArray.length).toBe(3)
    expect(typeof anArray).toBe("object")
  })
})
