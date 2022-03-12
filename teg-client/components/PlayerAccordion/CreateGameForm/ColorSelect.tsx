import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { CirclePicker } from 'react-color';

interface ColorSetterProps {
    colorSetter: Function,
    id_game?: string
}

const ColorSelect = ({ colorSetter, id_game }: ColorSetterProps) => {

    const [ availableColors, setAvailableColors ] = useState([]);

    useEffect(() => {
        let url = '/api/colors';
        if (id_game) url += '/' + id_game

        axios.get(url)
        .then((res) => {
            setAvailableColors(res.data)
        });
    },[])

    const handleOnChange = (e) => {
        const id_color = availableColors.find( color => color.hex === e.hex.toUpperCase());
        colorSetter(id_color.id);
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