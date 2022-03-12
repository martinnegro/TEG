import React, { useState } from 'react'
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router'  
import { Form, Button, Row, Col, Alert } from 'react-bootstrap'
import ColorSelect from './ColorSelect';

interface BodyCreateGame {
    id_user: string | null,
    alias: string,
    max_players: number,
    id_color: number | null
};

const initBodyState = {
    id_user: null,
    alias: '',
    max_players: 6,
    id_color: null
}

function CreateGameForm() {
    const router = useRouter();
    
    const [ error, setError ] = useState(null);
    const [ body, setBody ] = useState<BodyCreateGame>(initBodyState);

    const handleSetBody = (e) => {
        setBody( state => {
            return {
                ...state,
                [e.target.name]: e.target.value
            }
        } )
    };

    const setColorId = (id_color) => {
        setBody( state => {
            return {
                ...state,
                id_color
            }
        } )
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
            
        if (body.alias === undefined || body.alias === null || body.alias.length < 1) return setError('Elige un nombre para la partida');
        if (body.id_color === null) return setError('Elije un color!')

        try {
            const response = await axios.post('/api/game/new-game',body);
            console.log(response.status)
            if ( response.status !== 200 ) return (setError('No se pudo crear la partida :('))
            else router.push(`/game/${response.data.id}`)
        } catch(err) {
            setError('No se pudo crear la partida :(')
        }
    }

    return (
        <Form onSubmit={(e) => handleSubmit(e)} onChange={handleSetBody}>
            <Form.Group className="mb-1" controlId="alias">
                <Form.Label>
                    Nombre de la partida:
                </Form.Label>
                <Form.Control  type="text" placeholder='' name="alias"/>
            </Form.Group>
            <Row>
                <Form.Group as={Col} className="mb-1" controlId="max_players">
                    <Form.Label >
                        Máximo de jugadores
                    </Form.Label>
                    <Form.Control type="number" max="6" min="2" placeholder='2 a 6' name="max_players"/>
                </Form.Group>
                <Form.Group as={Col} className="mb-1" controlId="color" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <ColorSelect colorSetter={setColorId}/>
                </Form.Group>
            </Row>
            {
                error &&
                <Alert variant='danger' className='mb-1'>
                    {error} 
                </Alert>
            }
            <Button type="submit">Crear</Button>
        </Form>
    )
}

export default CreateGameForm