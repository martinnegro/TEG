import React, { useState } from 'react';
import Form from 'react-bootstrap/Form'

import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button';
import { PostStatus } from 'hooks/usePost';
import Spinner from 'react-bootstrap/Spinner';

interface NewUserProps {
    sendAlias: Function,
    statusPost: PostStatus
}

const NewUserForm: React.FC<NewUserProps> = ({ sendAlias, statusPost }) => {
    const [ alias, setAlias ] = useState('')
    const handleSendAlias = (e) => {
        e.preventDefault();
        if (alias.length === 0) return; 
        sendAlias(alias);
    };

    return (
        <Form
            onSubmit={handleSendAlias}
        >
            <Form.Label>Puedes crear un alias para jugar T.E.G.</Form.Label>
            <InputGroup>
                <Form.Control 
                    type='text' 
                    placeholder="Máximo 10 caracteres"
                    name="alias"
                    value={alias}
                    onChange={(e) => setAlias(e.target.value)}
                />
                <Button 
                    type="submit" 
                    disabled={alias.length === 0}
                    variant={
                        statusPost === 'waiting' ? 'primary' :
                        statusPost === 'loading' ? 'primary' :
                        statusPost === 'ok' ? 'success' :
                        statusPost === 'error' ? 'danger' : ''
                    }
                >
                    { 
                        statusPost === 'waiting' ? 'ENVIAR' :
                        statusPost === 'loading' ? <Spinner animation='border'  /> :
                        statusPost === 'ok' ? 'OK!' :
                        statusPost === 'error' ? 'ERROR' : ''
                    }
                </Button>
            </InputGroup>
            <Form.Text className="text-muted">
                Puedes crearlo más adelante
            </Form.Text>
        </Form>
    )
}

export default NewUserForm