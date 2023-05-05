import {useRef} from 'react'
import ListGroup from 'react-bootstrap/ListGroup';

function Inbox({ mails }) {

    return (
        <ListGroup>
            {
                mails.map(mail => (

                    <ListGroup.Item key={mail.id} className='d-flex justify-content-evenly'>
                        <p>{mail.sentBy}</p>
                        <div className='html' dangerouslySetInnerHTML={{__html: mail.content}}></div>
                    </ListGroup.Item>

                ))
            }
        </ListGroup>
    )
}

export default Inbox;