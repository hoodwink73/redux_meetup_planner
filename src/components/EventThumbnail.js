import React, {Component, PropTypes} from 'react'
// custom imports
import generateRandomColor from '../utilities/generateRandomColor'
// MUI imports
import Paper from 'material-ui/Paper'

const EventThumbnail = ({eventName, eventDate}) => (
    <Paper style={{ backgroundColor: generateRandomColor(),
                    width: '25%'}}
           zDepth={1}>
      <div> {eventName} <br/> {eventDate}</div>
    </Paper>
)

const {string} = PropTypes
EventThumbnail.propTypes = {
    eventName: string,
    eventDate: string
}

export default EventThumbnail
