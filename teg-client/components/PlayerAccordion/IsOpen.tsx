import { useContext } from 'react';
import { AccordionContext } from 'react-bootstrap';

const IsOpen = ({ children, eventKey }) => {
    const { activeEventKey } = useContext(AccordionContext);

    return (
        <>
        {
            eventKey === activeEventKey ?
            children :
            null
        }
        </>
    )
};

export default IsOpen;