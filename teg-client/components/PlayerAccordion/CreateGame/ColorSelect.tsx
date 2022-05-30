import axios from 'axios';
import useLoadFetch from 'hooks/useLoadFetch';
import React, { useState, useEffect } from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import { CirclePicker } from 'react-color';

interface ColorSetterProps {
    colorSetter: Function,
    gameId?: string
}

const ColorSelect = ({ colorSetter, gameId }: ColorSetterProps) => {
    const [ availableColors, status, error ] = useLoadFetch<[]>(`/api/colors${gameId ? `/${gameId}` : '' }`)

    const handleOnChange = (e) => {
        const colorId = availableColors.find( color => color.hex === e.hex.toUpperCase());
        colorSetter(colorId.id);
    };

    return (
        <>
            {
                  status === 'loading'
                ? <Spinner animation='border' variant="primary" size="sm"/>
                : status === 'ok'
                ? availableColors?.length > 0 &&
                <CirclePicker
                    colors={availableColors.map( objColor => objColor.hex )}
                    onChange={handleOnChange}
                />
                : <Alert variant='danfer'>Error</Alert>  
            }
        </>
    )
}

export default ColorSelect