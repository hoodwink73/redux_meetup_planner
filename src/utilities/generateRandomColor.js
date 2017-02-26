const colorsArray = [  '#64b5f6', '#1a237e', '#ffcc80',
                       '#ff8a65', '#ec407a', '#9c27b0']

const generateRandomColor = (anArrayOfColors) => {
  const randomIndex = Math.floor(Math.random() * anArrayOfColors.length)
  return anArrayOfColors[randomIndex]
}

export default generateRandomColor.bind(colorsArray)
