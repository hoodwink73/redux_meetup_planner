const dayAsString = (dayAsNumber) => {
  switch (dayAsNumber) {
    case 0:
      return 'Sunday'
      break
    case 1:
      return 'Monday'
      break
    case 2:
      return 'Tuesday'
      break
    case 3:
      return 'Wednesday'
      break
    case 4:
      return 'Thursday'
      break
    case 5:
      return 'Friday'
      break
    case 6:
      return 'Saturday'
      break
    default:
      return 'invalid day provided'
  }
}
const monthAsString = (monthAsNumber) => {
  switch (monthAsNumber) {
    case 0:
      return 'January'
      break
    case 1:
      return 'February'
      break
    case 2:
      return 'March'
      break
    case 3:
      return 'April'
      break
    case 4:
      return 'May'
      break
    case 5:
      return 'June'
      break
    case 6:
      return 'July'
      break
    case 7:
      return 'August'
      break
    case 8:
      return 'September'
      break
    case 9:
      return 'October'
      break
    case 10:
      return 'November'
      break
    case 11:
      return 'December'
      break
    default:
      return 'invalid month found'
  }
}
const hoursFormatted = (hours, minutes) => {
  if (hours < 11){
    return `${hours + 1}:${minutes} AM`
  } else if(hours == 11){
    return `${hours + 1}:${minutes} PM`
  } else {
    return `{hours - 11}:${minutes} PM`
  }
}

const formatDateAndTime = (eventDate, eventTime) => {
    const day = dayAsString(eventDate.getDay())
    const month = monthAsString(eventDate.getMonth())
    const date = eventDate.getDate()
    const time = hoursFormatted(eventTime.getHours(), eventTime.getMinutes())

    return `${day} ${month} ${date} at ${time}`
}

export default formatDateAndTime
