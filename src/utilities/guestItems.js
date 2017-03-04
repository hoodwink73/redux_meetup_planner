import React from 'react'
// custom imports
import generateRandomColor from './generateRandomColor'
// MUI imports
import {ListItem} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'

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
