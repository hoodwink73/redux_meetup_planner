import React from 'react'
import generateRandomColor from './generateRandomColor'

const guestItems = (eventGuests) => {
  eventGuests.map(guest => {
    const firstLetter = guest.charAt(0).toUpperCase()
    return(
      <ListItem primaryText={guest} key="1"
                leftAvatar={<Avatar backgroundColor={generateRandomColor()}>
                                    {firstLetter}
                            </Avatar>}/>
    )
  })

}

export default guestItems
