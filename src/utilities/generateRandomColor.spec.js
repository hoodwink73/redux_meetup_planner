import generateRandomColor from './generateRandomColor'

describe('Generate Random Color', () => {
  it('should produce a hex string', () => {
    let color = generateRandomColor()

    expect(typeof color).toBe("string")
    expect(color.length).toBe(7)
    expect(color.charAt(0)).toBe("#")
  })
})
