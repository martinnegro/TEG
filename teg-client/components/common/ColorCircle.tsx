import React from 'react'

interface ColorCircleProps {
    colorHex: string,
    diameter: string
}

const ColorCircle = ({ colorHex, diameter }:ColorCircleProps) => {

    return (
        <div style={{ 
            backgroundColor: colorHex, 
            height: diameter, 
            width: diameter,
            borderRadius: '50%'
        }}/>
    )
}

export default ColorCircle