import React from 'react'

export const CalendarEvent = ( { event }) => {

    const { title, user } = event

    return (
        <div>
         <span> { title }</span>
         <span style={{fontWeight: 'lighter'}}> - { user.name }</span>
        </div>
    )
}
