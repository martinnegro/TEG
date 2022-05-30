import React, { useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/router'  
import { Form, Button, Row, Col, Alert } from 'react-bootstrap'
import ColorSelect from './ColorSelect';
import { ColorSelectContainer, StyledForm, StyledLabel } from 'components/styledComponents/accordion.scss';

const initBodyState: NewGameRequestBody = {
    userId: null,
    alias: '',
    maxPlayers: 6,
    colorId: null
}

function CreateGameForm() {
    const router = useRouter();
    
    const [ error, setError ] = useState(null);
    const [ body, setBody ] = useState<NewGameRequestBody>(initBodyState);

    const handleSetBody = (e) => {
        setBody( state => {
            return {
                ...state,
                [e.target.name]: e.target.value
            }
        } )
    };

    const setColorId = (colorId) => {
        setBody( state => {
            return {
                ...state,
                colorId
            }
        } )
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
            
        if (body.alias === undefined || body.alias === null || body.alias.length < 1) return setError('Elige un nombre para la partida');
        if (body.colorId === null) return setError('Elije un color!')

        try {
            const response = await axios.post('/api/game/new-game',body);
            if ( response.status !== 200 ) return (setError('No se pudo crear la partida :('))
            else router.push(`/game/${response.data.id}`)
        } catch(err) {
            setError('No se pudo crear la partida :(')
        }
    }

    return (
        <StyledForm 
            onSubmit={(e) => handleSubmit(e)} 
            onChange={handleSetBody}
        >
            <div>
                <StyledLabel>
                    Nombre de la partida
                </StyledLabel>
                <Form.Control type="text" placeholder='' name="alias" size='sm'/>
            </div>
            <div>
                <StyledLabel>
                    Máximo de jugadores
                </StyledLabel>
                <Form.Select defaultValue="2" name="maxPlayers" size='sm'>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </Form.Select>
            </div>
            <div>
                <StyledLabel>
                    Elije un color
                </StyledLabel>
                <ColorSelectContainer>
                    <ColorSelect colorSetter={setColorId}/>
                </ColorSelectContainer>
            </div>
            {
                error &&
                <Alert variant='danger' className='mb-1' style={{ width: '100%' }}>
                    {error} 
                </Alert>
            }
            <Button 
                type="submit"
                style={{ width: '100%' }}
                size="sm"
            >
                Crear
            </Button>
        </StyledForm>
    )
}

export default CreateGameForm