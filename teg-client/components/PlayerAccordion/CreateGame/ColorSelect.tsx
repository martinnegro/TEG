import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { CirclePicker } from 'react-color';

interface ColorSetterProps {
    colorSetter: Function,
    gameId?: string
}

const ColorSelect = ({ colorSetter, gameId }: ColorSetterProps) => {

    const [ availableColors, setAvailableColors ] = useState([]);

    useEffect(() => {
        let url = '/api/colors';
        if (gameId) url += '/' + gameId;

        axios.get(url)
        .then((res) => {
            setAvailableColors(res.data)
        });
    },[gameId])

    const handleOnChange = (e) => {
        const colorId = availableColors.find( color => color.hex === e.hex.toUpperCase());
        colorSetter(colorId.id);
    };

    return (
        <>
            {
                availableColors.length > 0 &&
                <CirclePicker
                    colors={availableColors.map( objColor => objColor.hex )}
                    onChange={handleOnChange}
                />   
            }
        </>
    )
}

export default ColorSelect